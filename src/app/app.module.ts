// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// Componens Modules
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
import { GeneralComponent } from './Components/general/general.component';
import { LoadingComponent } from './Components/general/loading/loading.component';

//others
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { EventsComponent } from './components/events/events.component';
//import { EventListComponent } from './components/events/event-list/event-list.component';
//import { EventItemComponent } from './components/events/event-list/event-item/event-item.component';
import { EventService } from './Services/events/events.service';
import { EventDetailComponent } from './components/events/event-detail/event-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    GeneralComponent,
    LoadingComponent,
    EventsComponent,

    EventDetailComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModalModule,

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
    // ProfileModule,

    RouterModule.forRoot([
      // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
      { path: 'profile', loadChildren: './Components/profile/profile.module#ProfileModule' },
      // { path: '**', redirectTo: 'auth/login' }
    ])
  ],
  providers: [
    AuthenticationService,
    GeneralService,
    ProfileService,
    EventService,
    IsLoggedInGuardService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingHttpInterseptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
