import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminpanelComponent } from 'src/app/Components/adminpanel/adminpanel.component';
import { MainDashboardComponent } from 'src/app/Components/adminpanel/dashboards/main-dashboard/main-dashboard.component';
import { UsersDashboardComponent } from 'src/app/Components/adminpanel/dashboards/users-dashboard/users-dashboard.component';
import { HighlightsDashboardComponent } from 'src/app/Components/adminpanel/dashboards/highlights-dashboard/highlights-dashboard.component';

export const router = [
    { path: '', component: AdminpanelComponent, children: [
        { path: '', component: MainDashboardComponent},
        { path: 'users', component: UsersDashboardComponent},
        { path: 'highlights', component: HighlightsDashboardComponent},
    ]},
    //{ path: '**', redirectTo: '/' },
    //{ path: '', redirectTo: '/', pathMatch: 'full' }
]


/* Exporting routes variable so we can use in the app.module.ts */
export const AdminpanelRoutesModule: ModuleWithProviders = RouterModule.forChild(router);