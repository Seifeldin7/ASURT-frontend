import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminpanelComponent } from 'src/app/Components/adminpanel/adminpanel.component';

export const router = [
    { path: 'dashboard', component: AdminpanelComponent },
    //{ path: '**', redirectTo: '/' },
    //{ path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const AdminpanelRoutesModule: ModuleWithProviders = RouterModule.forRoot(router);