import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    private socialAuthService: SocialAuthService
  ) { }

  signup(data) {
    /**
     * data -> {email,password}
     * API -> path = "/api/register"
     */
    let request_body = {
      email: data.email,
      password: data.password
    }
    return this.http.post<{ email: string, password: string }>("api/register/", request_body);
  }

  login(data = null, provider: string = 'email-login') {
    /**
     * provider -> email-login , facebook , google
     * API -> path = "/api/login"
     * API -> path = "/api/social"
     * data changes between providers
     */
    let request_body = {};
    
    if (provider == 'google' || provider == 'facebook') {
      let socialPlatformProvider;
      if (provider == 'google') {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      } else if (provider == 'facebook') {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      }

      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          if (userData.provider == 'google') {
            request_body = {
              'id': userData.id,
              'name': userData.name,
              'email': userData.email,
              'provider': userData.provider,
            };

          } else if (userData.provider == 'facebook') {
            request_body = {
              'id': userData.id,
              'name': userData.name,
              'email': userData.email,
              'provider': userData.provider,
            };
          }

          // Send request to backend
          return this.http.post<any>('api/social/', request_body);
        }
      );

    } else {
      request_body = {
        email: data.email,
        password: data.password,
        remember_me: data.remember_me
      }
      return this.http.post<any>('api/login/', request_body);
    }
  }

  userIsExist(email: string) {
    /**
     * Check if this email exists before
     * API -> path = "/api/user-exist"
     */

    let request_body = {
      email: email
    }
    return this.http.post<any>("api/user-exist/", request_body);
  }

  tokenDecode(token: string): any {
    /**
     * Decode JWT
     */
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }

  isLoggedIn() {
    /**
     * Check if user logged in and verify token
     * API -> path = "/api/token-verify"
     */
    let request_body = {
      token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    }

    let verify: Subject<boolean> = new Subject();

    this.http.post<{ token: string }>("api/token-verify/", request_body).
      subscribe(
        (Response) => {
          if (Response.token) {
            verify.next(true);
          }
          else {
            verify.next(false);
          }
        },
        (err) => {
          verify.next(false);
          console.log("isLoggedIn Error ocurred")
        }
      )

    return verify;
  }

  storeToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  logout() {
    /**
     * Clear JWT from local storage
     */
    localStorage.removeItem('token');
  }
}

/**
 * Functions
 */

export function passwordMatchValidator(ac: AbstractControl) {
  /**
   * Confirmation password validator
   * required to name fields password1 | password2
   */
  const flag = ac.get('password1').value === ac.get('password2').value;
  if (!flag) {
    ac.get('password2').setErrors({ passwordMatch: true });
    return null;
  } else {
    return null;
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
  // baseUrl = 'http://127.0.0.1:8000/';
  baseUrl = 'http://localhost:3000/';
  // baseUrl ='https://domain-name.com/';
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      url: this.baseUrl + req.url
    });
    return next.handle(req);
  }
}
