import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../../../Services/Profile/profile.service';
import { Profile } from '../../../Models/profile.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [NgbModalConfig, NgbModal],
})

export class EditProfileComponent implements OnInit {
  editMode = false;
  profile: Profile = new Profile('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');
  profilepicbase64 = '';
  nationalfrontbase64 = '';
  nationalbackbase64 = '';
  passcoverbase64 = '';
  submitBtn = false;
  loading = false;
  savepic = false;
  editpic =true;
  removed =false;
  temp ='';
  data: any;
  // cropperSettings: CropperSettings;
  @ViewChild('f') profileform: NgForm;
  constructor(config: NgbModalConfig, private modalService: NgbModal, private profileservice: ProfileService, private http: HttpClient, private router: Router) {
    // this.cropperSettings = new CropperSettings();
    // this.cropperSettings.width = 100;
    // this.cropperSettings.height = 100;
    // this.cropperSettings.croppedWidth = 300;
    // this.cropperSettings.croppedHeight = 300;
    // this.cropperSettings.canvasWidth = 400;
    // this.cropperSettings.canvasHeight = 300;
    // this.cropperSettings.rounded = true;
    // this.cropperSettings.cropperClass = "cropper";
    // this.cropperSettings.croppingClass = "cropping";
    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit() {
    this.profileservice.profileExist();
    this.profileservice.editMode.take(1).subscribe(
      edit => {
        console.log("ngOnint")
        this.editMode = edit;
        this.profileservice.seteditMode(edit);
        if (edit == true) {
          this.editpic = false;
          this.removed = false;
          this.profileservice.fetchProfile().subscribe(
            (response) => {
              console.log(response)
              this.profile = response['0'];
              // console.log(this.profile.profile_pic)
              let baseUrlBackTest = "http://localhost:8000";
              this.profilepicbase64 = baseUrlBackTest + this.profile.profile_pic;
              this.temp = this.profilepicbase64;
              this.nationalfrontbase64 = '';
              this.nationalbackbase64 = '';
              this.passcoverbase64 = '';
              this.profileform.controls['name'].setValue(this.profile.name);
              this.profileform.controls['mobile'].setValue(this.profile.mobile);
              this.profileform.controls['uni'].setValue(this.profile.university);
              this.profileform.controls['faculty'].setValue(this.profile.faculty);
              this.profileform.controls['coll_id'].setValue(this.profile.college_id);
              this.profileform.controls['coll_dep'].setValue(this.profile.college_department);
              this.profileform.controls['grad_year'].setValue(this.profile.graduation_year);
              this.profileform.controls['address'].setValue(this.profile.address);
              this.profileform.controls['dob'].setValue(this.profile.birth_date);
              this.profileform.controls['n_id'].setValue(this.profile.national_id);
              this.profileform.controls['n_id_f_c'].setValue('');
              this.profileform.controls['n_id_b_c'].setValue('');
              this.profileform.controls['pass_id'].setValue(this.profile.passport_id);
              this.profileform.controls['pass_id_img'].setValue('');
              this.profileform.controls['em_name'].setValue(this.profile.emergency_name);
              this.profileform.controls['em_mobile'].setValue(this.profile.emergency_mobile);
              this.profileform.controls['em_relation'].setValue(this.profile.emergency_relation);
            },
            error => {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                // footer: '<a href>Why do I have this issue?</a>'
              })

            }
          );
        }
      }

    );


  }


  onSubmit(form: NgForm) {
    this.submitBtn = false;
    this.loading = true;
    this.removed=false;
    const pro = new Profile(this.profilepicbase64, form.value.name, form.value.mobile, form.value.uni, form.value.faculty,
      form.value.coll_id, form.value.coll_dep, form.value.grad_year, form.value.address, form.value.dob,
      form.value.n_id, this.nationalfrontbase64, this.nationalbackbase64, form.value.pass_id, this.passcoverbase64,
      form.value.em_name, form.value.em_mobile, form.value.em_relation);
    this.profileservice.setProfile(pro);
    if (this.profileservice.geteditMode()) {
      this.profileservice.EditProfile(pro).subscribe(
        (response: Profile) => {
          console.log(response);
          this.loading = false;
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
          var keys = Object.keys(error["error"]);
          this.loading = false;
          this.submitBtn = false;
          Swal.fire({
            type: 'error',
            title: error["error"][keys[0]][0]
          })

        }
      );
      this.submitBtn = true;
    }
    else {
      this.profileservice.CreateProfile(pro).subscribe(
        (response: Profile) => {
          this.loading = false;
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['../profile/view']);
        },
        (error) => {
          var keys = Object.keys(error["error"]);
          this.loading = false;
          this.submitBtn = false;
          Swal.fire({
            type: 'error',
            title: error["error"][keys[0]][0]
          })

        }
      );

      this.submitBtn = true;

    }

  }
  onCancel() {
    this.router.navigate(['../profile/view']);

  }
  onUploadChange(evt: any, index: number) {
    const file = evt.target.files[0];
    if (index == 0) {
      this.profilepicbase64 = this.croppedImage;

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
  

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageLoadedFlag = true;

  

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  fileChangeEvent(event: any, content): void {
    this.open(content);
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
    this.imageLoadedFlag = false;
    console.log("imageLoaded");
  }
  loadImageFailed() {
    // show message
    console.log("loadImageFailed");
  }



  onSave() {
    this.profilepicbase64 = this.croppedImage;
    this.imageLoadedFlag = true;
    this.savepic = true;
    this.removed = false;
    this.editpic = false;
  }
  onCancelpic() {
    this.savepic = false;
    this.profilepicbase64 = this.temp;
    this.imageChangedEvent = ''
    this.croppedImage = ''
  }
  onremovepic(){
    this.savepic = false;
    this.profilepicbase64 = '';
    this.imageChangedEvent = ''
    this.croppedImage = ''
    this.removed =true;
    this.editpic = true;

  }
  oneditpic() {
    this.editpic = true;
  }
}