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

@NgModule({
  declarations: [
    AdminpanelComponent,
    MainDashboardComponent,
    AdminSidebarComponent,
    UsersDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminpanelRoutesModule
  ],
  providers:[
    AdminpanelService,
    UsersService
  ]
})
export class AdminpanelModule { }
