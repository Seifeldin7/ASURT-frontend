import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { AlertService} from '../../../Services/Authentication/alert.service';
// import { UserService} from '../../../Services/Authentication/user.service';


@Component({
        selector: 'app-signup',
        templateUrl: 'signup.component.html'
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
        ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
    }
}
