import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignupComponent } from 'src/app/Components/authentication/signup/signup.component';
import { SigninComponent } from 'src/app/Components/authentication/signin/signin.component';
import { ChangePasswordComponent } from 'src/app/Components/authentication/change-password/change-password.component';
import { ForgetPasswordComponent } from 'src/app/Components/authentication/forget-password/forget-password.component';
import { AuthenticationComponent } from 'src/app/Components/authentication/authentication.component';

export const router = [
  {path:'auth', component:AuthenticationComponent, children:[
    {path:'register',component:SignupComponent},
    {path:'login',component:SigninComponent},
    {path:'change-password',component:ChangePasswordComponent},
    {path:'forget',component: ForgetPasswordComponent}
  ]},
  //{ path: '**', redirectTo: '/' },
  //{ path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const AuthenticationRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);