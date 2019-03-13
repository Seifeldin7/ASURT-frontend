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
            this.authService.isLoggedIn().subscribe(
                status => {
                if(status){ 
                    this.toastr.info("You need to logout first.");
                    this.router.navigate(['/']);
                }
            },
            err => {
                this.toastr.error("Somethins goes wrong. Please try again.");
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
<<<<<<< HEAD
                    this.toastr.success("Welcome");
=======
                    this.toastr.success("Pleased to meet u. have a nice day.");
>>>>>>> AuthSystem
                    this.router.navigate(['/']);
                }else{
                    this.toastr.error("Somethins goes wrong. Please try again.");
                }
            },
            (err)=>{
                this.submitted = false;
                if( 'error' in err.error ){
                    this.toastr.error(err.error.error);
                }
            }
        )
    }
}
