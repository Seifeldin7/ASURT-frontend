import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignupComponent } from 'src/app/Components/authentication/signup/signup.component';
import { SigninComponent } from 'src/app/Components/authentication/signin/signin.component';
import { ChangePasswordComponent } from 'src/app/Components/authentication/change-password/change-password.component';

export const router = [
  {path:'', children:[
    {path:'register',component:SignupComponent},
    {path:'login',component:SigninComponent},
    {path:'change-password',component:ChangePasswordComponent},
  ]},
  //{ path: '**', redirectTo: '/' },
  //{ path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const AuthenticationRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);