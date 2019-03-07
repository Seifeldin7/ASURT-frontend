import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

// Components
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { AuthenticationRoutesModule } from 'src/app/Routing/Authentication/authentication.service';
<<<<<<< HEAD
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
=======
import { ChangePasswordGuardService } from 'src/app/Routing/Authentication/change-password-guard.service';
>>>>>>> cc41c7a6a56f939b798bd0d8f1a2a9c3e24c294d

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationRoutesModule,
    
    // angular-6-social-login
    SocialLoginModule,
  ],
  providers:[
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
    ChangePasswordGuardService,
  ]

})
export class AuthenticationModule { }

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2065091893721004")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("1044068226622-mivg9jeilmvd0mkjicsmfqqsk5dk1ihm.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}
