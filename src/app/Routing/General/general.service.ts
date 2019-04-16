import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomepageComponent } from 'src/app/Components/website/homepage/homepage.component';

export const router = [
  { path: '', component: HomepageComponent, },
  { path: '**', redirectTo: '/' },
  //{ path: '', redirectTo: '/', pathMatch: 'full' }
]

/* Exporting routes variable so we can use in the app.module.ts */
export const GeneralRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);
