import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  signup(data){
    /**
     * data -> {email,password}
     * API -> path = "/api/register"
     */
  }

  login(data,provider:string){
    /**
     * data -> {email, password}
     * provider -> email-login , facebook , google
     * API -> path = "/api/login"
     */
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

}
