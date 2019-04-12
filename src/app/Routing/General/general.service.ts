import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamsComponent } from 'src/app/Components/website/teams/teams.component';

export const router = [
  { path: 'teams', component: TeamsComponent }

  // { path: '**', redirectTo: '/' },
  // { path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const GeneralRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);
