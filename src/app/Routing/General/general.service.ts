import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamsComponent } from 'src/app/Components/teams/teams.component';
import { TeamPageComponent } from 'src/app/Components/teams/team-page/team-page.component';

export const router = [
  { path: 'teams/:type', component: TeamsComponent },
  { path: 'teams/:type/:id', component: TeamPageComponent },
  // { path: '**', redirectTo: '/' },
  // { path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const GeneralRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);
