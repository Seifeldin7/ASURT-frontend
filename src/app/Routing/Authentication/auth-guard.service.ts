import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable()
export class IsLoggedInGuardService implements CanActivate {

  /**
   * Auth Guard to check logged in user
   * * Verify user token
   */

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn()
            .pipe(
              map(
                status => {
                  if(!!status){
                    return true;
                  }else{
                    //TODO: Alert Component
                    this.router.navigate(['/auth/login']);
                    return false;
                  }
                },
                err => {
                  //TODO: Error Handle
                  this.router.navigate(['/auth/login']);
                  return false;
                }
              )
            );
  }
}



@Injectable()
export class ChangePasswordGuardService implements CanActivate {

  /**
   * Change Password Component Guard
   * * Verify user token
   * * GET token from URL for Forget Password
   * * or GET local storage token to change logged in user password 
   */

  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let token:string = null;
    if(next.url[1]){
      token = JSON.stringify(next.url[1].path);
    }else{
      token = localStorage.getItem('token');
    }

    if(token != null){
      return this.authService.tokenVerify(token)
      .pipe(
        map((response: any)=>{
          console.log(response);
          if(!!response.token){
            return true;
          }else{
            console.log('change password guard err');
            this.router.navigate(['/auth/login']);
            return false;
          }
        },
        err=>{
          console.log("change pass guard error");
          this.router.navigate(['/auth/login']);
          return false
        })
      );
    }else{
      this.router.navigate(['/auth/login']);
      return false;
    }
      
  }

}
