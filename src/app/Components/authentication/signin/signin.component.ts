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
import { AlertService } from 'src/app/Services/Authentication/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['./signin.component.css']

}
)

export class SigninComponent implements OnInit {

  submitted = false;
  returnUrl: string;

  /**
     * HTML Elements
  **/
  loginForm: FormGroup = this.formBuilder.group({
    /**
     * TODO: Validate email is exists
     */
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', [Validators.required,]],
    remember_me: ['',]

  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private socialAuthService: AuthService
  ) { }


  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      // TODO: Show Alert
      return;
    }

    this.authenticationService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      remember_me: this.loginForm.value.remember_me
    },'email-login')
      .subscribe(
        response => {
          if(response.token){
            this.authenticationService.storeToken(response.token);
            this.router.navigate([this.returnUrl]);
          }else{
            // TODO: alert error handle
            console.log('login no token');
          }
        },
        error => {
          // TODO: Error Handle
          console.log('login request error');
          this.alertService.error(error);
        });
  }

  public socialSignIn(socialPlatform: string) {
    this.authenticationService.login(null,socialPlatform).subscribe(
      response => {
        if(response.token){
          this.authenticationService.storeToken(response.token);
          this.router.navigate([this.returnUrl]);
        }else{
          // TODO: alert error handle
          console.log('login no token');
        }
      },
      error => {
        // TODO: Error Handle
        console.log('login request error');
        // this.alertService.error(error);
      }
    );
  }

}