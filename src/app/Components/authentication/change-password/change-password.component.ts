import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator, AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  private userMail:User;
  private verified:boolean;

  changePasswordForm:FormGroup = this.formBuilder.group({
    password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
  },{validators:[passwordMatchValidator]});

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    console.log('change')

    // let token:string;
    // if(this.activatedRoute.snapshot.params.get('token')){
    //   // token = this.activatedRoute.snapshot.params.get('token');
    // }else{
    //   // token = this.authService.tokenDecode(localStorage.getItem('token'));
    // }
    
    // let payload = this.authService.tokenDecode(token);
    // this.userMail = payload.email;

  }

  get f() { return this.changePasswordForm.controls; }

  onSubmit(){
    console.log('submit');
  }

}
