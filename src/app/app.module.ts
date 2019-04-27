// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Componens Modules
import { AuthenticationModule } from './Components/authentication/authentication.module';


//Directives


// Services
import { AuthenticationService, JwtInterceptor, APIInterceptor } from './Services/Authentication/authentication.service';
import { GeneralService, LoadingHttpInterseptorService } from './Services/General/general.service';
import { ProfileService } from './Services/Profile/profile.service';
import { EventsService } from './Services/adminpanel/events.service';


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
import { WebsiteComponent } from './Components/website/website.component';
import { NewsFeedComponent } from './Components/news-feed/news-feed.component';
import { PostComponent } from './Components/news-feed/post/post.component';
import { NewsFeedService } from './Services/NewsFeed/news-feed.service';
import { TeamsComponent } from './Components/website/teams/teams.component';
import { TeamPageComponent } from './Components/website/teams/team-page/team-page.component';

//others
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './Components/website/footer/footer.component';
import { HomepageComponent } from './Components/website/homepage/homepage.component';
import { NavbarComponent } from './Components/website/navbar/navbar.component';
import { LatestnewsComponent } from './Components/website/homepage/latestnews/latestnews.component';
import { EventsComponent } from './Components/website/homepage/events/events.component';
import { SponsorsComponent } from './Components/website/sponsors/sponsors.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    GeneralComponent,
    LoadingComponent,
    WebsiteComponent,
    NewsFeedComponent,
    PostComponent,
    TeamsComponent,
    TeamPageComponent,
    FooterComponent,
    HomepageComponent,
    NavbarComponent,
    LatestnewsComponent,
    EventsComponent,
    SponsorsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModalModule,
    NgbModule.forRoot(),


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
      { path: 'adminpanel', loadChildren: './Components/adminpanel/adminpanel.module#AdminpanelModule' },
      // { path: '**', redirectTo: 'auth/login' }
    ]),
  ],
  providers: [
    AuthenticationService,
    GeneralService,
    ProfileService,
    IsLoggedInGuardService,
    NewsFeedService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingHttpInterseptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
