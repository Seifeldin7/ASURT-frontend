import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileRoutingModule } from '../../Routing/Profile/profile.router';
import { ProfileComponent } from './profile.component';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { ImageCropperComponent } from 'ng2-img-cropper';

@NgModule({
  declarations: [
    ProfileComponent,
    ViewProfileComponent,
    EditProfileComponent,
    ImageCropperComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileRoutingModule,
    SidenavModule
  ]
 
})
export class ProfileModule { }
