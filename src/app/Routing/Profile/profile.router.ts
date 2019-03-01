import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

export const router = [
  //{ path: '**', redirectTo: '/' },
  //{ path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const ProfileRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);