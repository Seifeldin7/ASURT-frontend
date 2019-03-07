import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignupComponent } from 'src/app/Components/authentication/signup/signup.component';
import { SigninComponent } from 'src/app/Components/authentication/signin/signin.component';
import { ChangePasswordComponent } from 'src/app/Components/authentication/change-password/change-password.component';
import { ForgetPasswordComponent } from 'src/app/Components/authentication/forget-password/forget-password.component';
import { AuthenticationComponent } from 'src/app/Components/authentication/authentication.component';
import { ChangePasswordGuardService } from './change-password-guard.service';

export const router = [
  {path:'auth', component:AuthenticationComponent, children:[
    {path:'register',component:SignupComponent },
    {path:'login',component:SigninComponent},
<<<<<<< HEAD
    {path:'change-password',component:ChangePasswordComponent},
    {path:'forget',component: ForgetPasswordComponent}
=======
    {path:'change-password/:token',component:ChangePasswordComponent, canActivate: [ChangePasswordGuardService]},
    {path:'change-password',component:ChangePasswordComponent, canActivate: [ChangePasswordGuardService]},
>>>>>>> cc41c7a6a56f939b798bd0d8f1a2a9c3e24c294d
  ]},
  //{ path: '**', redirectTo: '/' },
  //{ path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const AuthenticationRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);