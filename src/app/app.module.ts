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




// Services
import { AuthenticationService, JwtInterceptor, APIInterceptor } from './Services/Authentication/authentication.service';
import { GeneralService, LoadingHttpInterseptorService } from './Services/General/general.service';
import { ProfileService } from './Services/Profile/profile.service';
import { EventsService } from './Services/adminpanel/events.service';
import { EventService } from './Services/Events/events.service';


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
import { HomeHighlightsComponent } from './Components/website/homepage/home-highlights/home-highlights.component';
import { HomeEventsComponent } from './Components/website/homepage/home-events/home-events.component';
import { SponsorsComponent } from './Components/website/sponsors/sponsors.component';

// Components
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { FAQComponent } from './Components/faq/faq.component';

//import { EventListComponent } from './components/events/event-list/event-list.component';
//import { EventItemComponent } from './components/events/event-list/event-item/event-item.component';
import { EventsComponent } from './Components/events/events.component';
import { EventDetailComponent } from './Components/events/event-detail/event-detail.component';


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
    HomeHighlightsComponent,
    HomeEventsComponent,
    SponsorsComponent,
    EventsComponent,
    AboutUsComponent,
    FAQComponent,
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
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', component: HomepageComponent },
      { path: 'profile', loadChildren: './Components/profile/profile.module#ProfileModule' },
      { path: 'adminpanel', loadChildren: './Components/adminpanel/adminpanel.module#AdminpanelModule' },
      { path: 'events', loadChildren: './Components/events/events.module#EventsModule' },
      // { path: '**', redirectTo: 'auth/login' }
      { path: '**', redirectTo: '' }
    ]),
  ],
  providers: [
    AuthenticationService,
    GeneralService,
    ProfileService,
    EventsService,
    EventService,
    EventsService,
    IsLoggedInGuardService,
    NewsFeedService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingHttpInterseptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
