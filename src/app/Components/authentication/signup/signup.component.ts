import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, passwordMatchValidator } from 'src/app/Services/Authentication/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    submitted:boolean = false;

    /**
     * HTML Elements
     */
    registerForm:FormGroup = this.formBuilder.group({
        /**
         * TODO: Validate if user exists before
         */
        email: ['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],

        password: this.formBuilder.group({
            password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
            password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
        },{validators:[passwordMatchValidator]}),

    });

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthenticationService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        //TODO: If user logged in show logout first alert
        this.authService.isLoggedIn().subscribe(
            status => {
                if(status){
                    // TODO: Navigate to home 
                    // this.router.navigate(['/']);
                }else{}
            }
        );
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.authService.signup({
            email: this.registerForm.value.email,
            password: this.registerForm.value.password.password1,
        }).subscribe(
            (response:any) => {
                if(response.token){
                    this.authService.storeToken(response.token);
                    this.router.navigate(['/']);
                }else{
                    //TODO: Handle Errors
                    console.log('register form response error');
                    this.toastr.error("Register form error");
                }
            },
            (err)=>{
                //TODO: Handle Errors
                console.log('resister form err submit');
                this.toastr.error("Register form error");
            }
        )
    }
}
