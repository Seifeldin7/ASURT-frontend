// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthenticationModule } from './Components/authentication/authentication.module';


//Directives


// Services
import { AuthenticationService, JwtInterceptor, APIInterceptor } from './Services/Authentication/authentication.service';
import { GeneralService, LoadingHttpInterseptorService } from './Services/General/general.service';
import { ProfileService } from './Services/Profile/profile.service';


// Routers
import { GeneralRoutesModule } from './Routing/General/general.service';



//AuthGuard
import { IsLoggedInGuardService } from './Routing/Authentication/auth-guard.service';


//Pipes


// Components
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './Components/authentication/authentication.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { GeneralComponent } from './Components/general/general.component';
import { LoadingComponent } from './Components/general/loading/loading.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';

//others
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    GeneralComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,

    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      enableHtml: true,
      positionClass: 'toast-bottom-right',
    }),

    GeneralRoutesModule,
    // ProfileRoutesModule,

    // Modules
    AuthenticationModule,

    RouterModule.forRoot([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'profile', loadChildren: './Components/profile/profile.module#ProfileModule' },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  providers: [
    AuthenticationService,
    GeneralService,
    ProfileService,

    IsLoggedInGuardService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingHttpInterseptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
