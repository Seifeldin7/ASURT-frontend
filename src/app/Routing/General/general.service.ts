import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewsFeedComponent } from 'src/app/Components/news-feed/news-feed.component';
import { TeamsComponent } from 'src/app/Components/teams/teams.component';
import { TeamPageComponent } from 'src/app/Components/teams/team-page/team-page.component';

import { HomepageComponent } from 'src/app/Components/homepage/homepage.component';

export const router = [
  { path:'', component: HomepageComponent},
  { path:'newsfeed', component: NewsFeedComponent},
  { path: 'teams/:type', component: TeamsComponent },
  { path: 'teams/:type/:id', component: TeamPageComponent },
  // { path: '**', redirectTo: '/' },
  // { path: '', redirectTo: '/', pathMatch: 'full' }
]

/* Exporting routes variable so we can use in the app.module.ts */
export const GeneralRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);
