import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.model';
import Swal from 'sweetalert2'
import 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';

import { ProfileService } from '../../../Services/Profile/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  NullImage:boolean =true;
  pro:Profile = new Profile('','','','','','','','','','','','','','','','','','');

  constructor(private profileservice:ProfileService, private route: ActivatedRoute, private router:Router) { }
 

  getProfile(){
    this.profileservice.fetchProfile().subscribe(
      (profile) => {
        this.pro = profile;
        this.profileservice.setProfile(this.pro);
        
        if(this.pro.profile_pic==null || this.pro.profile_pic ==''){
          this.NullImage=true
        }
        else{
          this.NullImage = false;
        }
      },
      error =>{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href>Why do I have this issue?</a>'
        })
      }
    )
  }
  ngOnInit() {
   
   this.getProfile();
   
  }
  
  onEdit(){
    this.router.navigate(['../profile/create']);
  }

  previewNational_ID_Front(){
    Swal.fire({
      title: 'National ID',
      imageUrl: this.pro.national_front,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      animation: false
    })
  }
  previewPassport_ID(){
    Swal.fire({
      title: 'Passport ID',
      imageUrl: this.pro.passport_img,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      animation: false
    })
  }
  previewNational_ID_Back(){
    Swal.fire({
      title: 'National ID',
      imageUrl: this.pro.national_back,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
      animation: false
    })
  }
}

