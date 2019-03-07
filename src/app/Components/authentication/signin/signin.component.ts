import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

// import { AlertService } from '../../../Services/Authentication/alert.service';
import { AuthenticationService } from '../../../Services/Authentication/authentication.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['./signin.component.css']

}
)

export class SigninComponent implements OnInit {

  /**
     * HTML Elements
  **/
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required,]],
    remember_me: ['',]

  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) { }


  ngOnInit() {

    this.authService.logout();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      remember_me: this.loginForm.value.remember_me,
    }).subscribe(
      (response: any) => {
        if (response.token) {
          this.authService.storeToken(response.token);
          this.router.navigate(['/']);
          console.log('logged in');
        } else {
          console.log('login form response error');
        }
      },
      (err) => {
        console.log('login form err submit');
      }
    )
  }
}