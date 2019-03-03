// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


//Directives


// Services
import { AuthenticationService } from './Services/Authentication/authentication.service';
import { GeneralService } from './Services/General/general.service';
import { ProfileService } from './Services/Profile/profile.service';


// Routers
import { AuthenticationRoutesModule } from './Routing/Authentication/authentication.service';
import { GeneralRoutesModule } from './Routing/General/general.service';



//AuthGuard


//Pipes


// Components
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './Components/authentication/authentication.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { GeneralComponent } from './Components/general/general.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    GeneralComponent,
    LoadingScreenComponent,
  ],
  imports: [
    BrowserModule,
    AuthenticationRoutesModule,
    GeneralRoutesModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {path:'profile', loadChildren:'./Components/profile/profile.module#ProfileModule'},
      { path: '**', redirectTo: 'login' }
    ])
  ],
  providers: [
    AuthenticationService,
    GeneralService,
    ProfileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
