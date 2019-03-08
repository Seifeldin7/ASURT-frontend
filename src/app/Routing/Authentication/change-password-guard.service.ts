import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuardService implements CanActivate {

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
      return this.authService.tokenVerify(token);
      // .pipe(
      //   map((response: any)=>{
      //     console.log(response);
      //     if(response.token){
      //       console.log('guard1');
      //       return Observable.create(true);
      //     }else{
      //       this.router.navigate(['/auth/login']);
      //       return Observable.create(false);
      //     }
      //   },
      //   err=>{
      //     console.log(err);
      //     this.router.navigate(['/auth/login']);
      //   })
      // );
    }else{
      this.router.navigate(['/auth/login']);
      return Observable.create(false);
    }
      
  }

}
