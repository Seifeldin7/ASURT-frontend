import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../../../Services/Profile/profile.service';
import { Profile } from '../profile.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  editMode = false;
  profil: Profile = new Profile('','','','','','','','','','','','','','','','','','');
  //subscription: Subscription;
  profilepicbase64 = '';
  nationalfrontbase64 = '';
  nationalbackbase64 = '';
  passcoverbase64 = '';
  submitBtn= false;
  loading =false;
  savepic =false;
  data: any;
  cropperSettings: CropperSettings;
  @ViewChild('f') profileform: NgForm;
  constructor(private profileservice: ProfileService, private http: HttpClient, private router: Router) { 
    this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth =100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 400;
        this.cropperSettings.canvasHeight = 300;
        this.cropperSettings.rounded =true;
        this.data = {};
  }

  ngOnInit() {
    this.profileservice.profileExist();
    this.profileservice.editMode.subscribe(
      edit=>{
        this.editMode =edit;
        this.profileservice.seteditMode(edit);
        if(edit == true){
          this.profileservice.fetchProfile().subscribe(
            (response)=> {
              console.log(response)
              this.profil =response;
              this.profileform.controls['name'].setValue(this.profil.Fullname);
              this.profileform.controls['mobile'].setValue(this.profil.Mobile);
              this.profileform.controls['uni'].setValue(this.profil.University);
              this.profileform.controls['faculty'].setValue(this.profil.Faculty);
              this.profileform.controls['coll_id'].setValue(this.profil.College_id);
              this.profileform.controls['coll_dep'].setValue(this.profil.College_Department);
              this.profileform.controls['grad_year'].setValue(this.profil.Expected_Year_Of_Graduation);
              this.profileform.controls['address'].setValue(this.profil.Address);
              this.profileform.controls['dob'].setValue(this.profil.DOB);
              this.profileform.controls['n_id'].setValue(this.profil.National_id);
              this.profileform.controls['n_id_f_c'].setValue('');
              this.profileform.controls['n_id_b_c'].setValue('');
              this.profileform.controls['pass_id'].setValue(this.profil.Passport_id);
              this.profileform.controls['pass_id_img'].setValue('');
              this.profileform.controls['em_name'].setValue(this.profil.Em_contact_name);
              this.profileform.controls['em_mobile'].setValue(this.profil.Em_contact_mobile);
              this.profileform.controls['em_relation'].setValue(this.profil.Em_contact_relation);       
          },
            error => {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href>Why do I have this issue?</a>'
            })
          
          }
          );
        }
        }
      
    );
    

    }
  
  
  onSubmit(form: NgForm) {
    this.submitBtn= false;
    this.loading =true;
    const pro = new Profile(this.profilepicbase64, form.value.name, form.value.mobile, form.value.uni, form.value.faculty,
      form.value.coll_id, form.value.coll_dep, form.value.grad_year, form.value.address, form.value.dob,
      form.value.n_id, this.nationalfrontbase64, this.nationalbackbase64, form.value.pass_id, this.passcoverbase64,
      form.value.em_name, form.value.em_mobile, form.value.em_relation);
    this.profileservice.setProfile(pro);
    if(this.profileservice.geteditMode()){
      this.profileservice.EditProfile(pro).subscribe(
        (response: Profile) => { 
          console.log(response);
          this.loading =false;
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['../profile/view']);
         },
        error => {
          this.loading =false;
          this.submitBtn =false;
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
          
        }
      );
      this.submitBtn= true;
    }
    else{
      this.profileservice.CreateProfile(pro).subscribe(
        (response: Profile) => { 
          //console.log(response);
          this.loading =false;
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['../profile/view']);
         },
        error => {
          this.loading =false;
          this.submitBtn =false;
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
          })
          
        }
      );
      this.submitBtn= true;

    }

  }
  onCancel() {
    this.router.navigate(['../profile/view']);

  }
  onUploadChange(evt: any, index: number) {
    const file = evt.target.files[0];
    if (index == 0) {
      this.profilepicbase64 = this.data.image ;
      
    }
    if (file) {
      const reader = new FileReader();
      
      if (index == 1) {
        reader.onload = this.handleReaderLoaded1.bind(this);
      }
      if (index == 2) {
        reader.onload = this.handleReaderLoaded2.bind(this);
      }
      if (index == 3) {
        reader.onload = this.handleReaderLoaded3.bind(this);
      }
      reader.readAsBinaryString(file);
    }
  }
  handleReaderLoaded1(e) {
    this.nationalfrontbase64 = 'data:image/png;base64,' + btoa(e.target.result);
  }
  handleReaderLoaded2(e) {
    this.nationalbackbase64 = 'data:image/png;base64,' + btoa(e.target.result);
  }
  handleReaderLoaded3(e) {
    this.passcoverbase64 = 'data:image/png;base64,' + btoa(e.target.result);
  }
  /*ngOnDestroy() {
    this.subscription.unsubscribe();
  }*/
 onSave(){
  this.profilepicbase64 = this.data.image ;
  this.savepic =true;
 }
onCancelpic(){
  this.savepic =false;
}
}
