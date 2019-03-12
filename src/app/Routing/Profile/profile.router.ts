// import { ModuleWithProviders } from '@angular/core';
// import { RouterModule } from '@angular/router';

// export const router = [
//   //{ path: '**', redirectTo: '/' },
//   //{ path: '', redirectTo: '/', pathMatch: 'full' }
// ]


// /* Exporting routes variable so we can use in the app.module.ts */
// export const ProfileRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../../Components/profile/profile.component';
import { EditProfileComponent } from '../../Components/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from '../../Components/profile/view-profile/view-profile.component';



const profileRoutes: Routes = [
  { path: '', component: ProfileComponent, 
  //canActivate: [AuthGuard],
   children: [
    { path: 'create', component: EditProfileComponent },
    { path: 'view', component: ViewProfileComponent  },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [RouterModule],
  
})
export class ProfileRoutingModule {}