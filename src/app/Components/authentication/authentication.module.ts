import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

// Components
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { AuthenticationRoutesModule } from 'src/app/Routing/Authentication/authentication.service';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationRoutesModule
  ],

})
export class AuthenticationModule { }
