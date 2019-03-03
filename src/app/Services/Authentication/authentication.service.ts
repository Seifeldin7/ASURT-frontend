import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private socialAuthService: AuthService) { }

  signup(data){
    /**
     * data -> {email,password}
     * API -> path = "/api/register"
     */
    let request_body = {
      email: data.email,
      password: data.password
    }
    return this.http.post("api/register/", request_body);
  }

  login(provider:string = 'email-login', data = null){
    /**
     * provider -> email-login , facebook , google
     * API -> path = "/api/login"
     * API -> path = "/api/social"
     * data changes between providers
     */
    let request_body = {};
    if(provider == 'google' || provider == 'facebook'){
      let socialPlatformProvider;
      if (provider == 'google'){
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }else if(provider == 'facebook'){
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      }
      
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          if(userData.provider == 'google') {
            request_body = {
              'id': userData.id,
              'name': userData.name,
              'email': userData.email,
              'provider': userData.provider,
            };
  
          }else if(userData.provider == 'facebook') {
            request_body = {
              'id': userData.id,
              'name': userData.name,
              'email': userData.email,
              'provider': userData.provider,
            };
          }
          
          // Send request to backend
          return this.http.post<any>('api/social/', request_body)
                .subscribe(
                  response=>{
                    /**
                     * Store JWT to local-storage
                     */
                    if(response.token){
                      localStorage.setItem('token', JSON.stringify(response.token));
                    }
                  },
                  err=>{
                    console.log('social login error');
                  }
                );
        }
      );

    }else{
      request_body = {
        email: data.email,
        password: data.password,
        remember_me: data.remember_me
      }
      return this.http.post<any>('api/login/', request_body)
                .subscribe(
                  response=>{
                    /**
                     * Store JWT to local-storage
                     */
                    if(response.token){
                      localStorage.setItem('token', JSON.stringify(response.token));
                    }
                  },
                  err=>{
                    console.log('normal login error');
                  }
                );
    }
  }

  userIsExist(email:string){
    /**
     * Check if this email exists before
     * API -> path = "/api/user-exist"
     */
  }

  tokenDecode(){
    /**
     * Get payload data
     */
  }

  isLoggedIn(){
    /**
     * Check if user logged in and verify token
     * API -> path = "/api/token-verify"
     */
  }

  logout(){
    /**
     * Clear JWT from local storage
     */
    localStorage.removeItem('token');
  }
}

/**
 * Authentication Interceptors
 */

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `JWT ${token}`
                }
            });
        }
        return next.handle(request);
    }
}


@Injectable()
export class APIInterceptor implements HttpInterceptor {
    baseUrl = 'http://127.0.0.1:8000/';
    // baseUrl ='https://domain-name.com/';
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler){
        req = req.clone({
            url: this.baseUrl + req.url
        });
        return next.handle(req);
    }
}
