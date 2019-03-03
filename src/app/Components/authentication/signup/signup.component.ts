import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['./signup.component.css']

})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;

    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        // this.registerForm = this.formBuilder.group({
        //     firstName: ['', Validators.required],
        //     lastName: ['', Validators.required],
        //     username: ['', Validators.required],
        //     password: ['', [Validators.required, Validators.minLength(6)]]
        // });
    }

    // convenience getter for easy access to form fields
    // get f() { return this.registerForm.controls; }

    onSubmit() {

    }
}
