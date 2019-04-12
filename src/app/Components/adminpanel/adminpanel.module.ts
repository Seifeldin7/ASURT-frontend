import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


/** Services */
import { AdminpanelRoutesModule } from 'src/app/Routing/adminpanel/adminpanel.router';
import { AdminpanelService } from 'src/app/Services/adminpanel/adminpanel.service';
import { UsersService } from 'src/app/Services/adminpanel/users.service';

/* Componenents */
import { AdminpanelComponent } from './adminpanel.component';
import { MainDashboardComponent } from './dashboards/main-dashboard/main-dashboard.component';
import { AdminSidebarComponent } from './partials/admin-sidebar/admin-sidebar.component';
import { UsersDashboardComponent } from './dashboards/users-dashboard/users-dashboard.component';
import { HighlightsDashboardComponent } from './dashboards/highlights-dashboard/highlights-dashboard.component';
import { HighlightCardComponent } from './dashboards/highlights-dashboard/highlight-card/highlight-card.component';
import { HighlightsService } from 'src/app/Services/adminpanel/highlights.service';

@NgModule({
  declarations: [
    AdminpanelComponent,
    MainDashboardComponent,
    AdminSidebarComponent,
    UsersDashboardComponent,
    HighlightsDashboardComponent,
    HighlightCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminpanelRoutesModule
  ],
  providers:[
    AdminpanelService,
    UsersService,
    HighlightsService
  ]
})
export class AdminpanelModule { }
