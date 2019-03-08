import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  private token:string;

  changePasswordForm:FormGroup = this.formBuilder.group({
    password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
  },{validators:[passwordMatchValidator]});

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    if(this.activatedRoute.snapshot.url[1]){
      this.token = this.activatedRoute.snapshot.params.get('token');
    }else{
      this.token = localStorage.getItem('token');
    }
    
    this.userMail = this.authService.tokenDecode(this.token).email;
  }

  get f() { return this.changePasswordForm.controls; }

  onSubmit(){
    this.authService.changePassword({
      email: this.userMail,
      password: this.changePasswordForm.value.password1
    }).subscribe(
      response =>{
        //TODO: navigate to login after change password
        this.router.navigate(['/']);
        console.log('change password response');
      },
      err => {
        //TODO: Handle All kined of errors
        console.log('change password err');
      }
    );
  }

}
