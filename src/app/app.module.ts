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
import { ProfileRoutesModule } from './Routing/Profile/profile.router';


//AuthGuard


//Pipes


// Components
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './Components/authentication/authentication.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { GeneralComponent } from './Components/general/general.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ProfileComponent,
    GeneralComponent,
  ],
  imports: [
    BrowserModule,
    AuthenticationRoutesModule,
    GeneralRoutesModule,
    ProfileRoutesModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
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
