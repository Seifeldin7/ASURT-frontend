import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from 'src/app/Components/website/teams/teams.component';



const websiterouting: Routes = [
  {
    path: 'teams', component: TeamsComponent
  },
];


@NgModule({
  imports: [
    RouterModule.forChild(websiterouting)
  ],
  exports: [RouterModule],

})
export class WebsiteRoutingModule { }
