import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, passwordMatchValidator } from 'src/app/Services/Authentication/authentication.service';


@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    /**
     * HTML Elements
     */
    registerForm:FormGroup = this.formBuilder.group({
        email: ['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],

        password: this.formBuilder.group({
            password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
            password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
        },{validators:[passwordMatchValidator]}),

    });

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {

        this.authService.isLoggedIn().subscribe(
            status => {
                if(status){
                    this.router.navigate(['/']);
                }else{}
            }
        );
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.authService.signup({
            email: this.registerForm.value.email,
            password: this.registerForm.value.password.password1,
        }).subscribe(
            (response:any) => {
                if(response.token){
                    this.authService.storeToken(response.token);
                    this.router.navigate(['/']);
                    console.log('signed up');
                }else{
                    console.log('register form response error');
                }
            },
            (err)=>{
                console.log('resister form err submit');
            }
        )
    }
}
