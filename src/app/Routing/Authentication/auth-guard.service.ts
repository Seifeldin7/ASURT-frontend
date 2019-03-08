import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable()
export class ChangePasswordGuardService implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
    console.log('guard');
    // console.log(next.url[1].path);

    let token:string = null;
    if(next.url[1]){
      token = next.url[1].path;
    }else{
      token = localStorage.getItem('token');
    }

    console.log(token)

    if(token != null){
      console.log('not null')
      return this.authService.tokenVerify(token)
      .pipe(
        map((response: any)=>{
          console.log(response);
          
          if(!!response.token){
            console.log('guard1');
            return true;
          }else{
            console.log('guard2');
            this.router.navigate(['/auth/login']);
            return false;
          }
        },
        err=>{
          console.log(err);
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
