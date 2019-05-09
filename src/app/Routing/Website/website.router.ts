import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from 'src/app/Components/teams/teams.component';
import { TeamPageComponent } from 'src/app/Components/teams/team-page/team-page.component';


const websiterouting: Routes = [
  // {
  //   path: 'teams', component: TeamsComponent , children:[
  //     { path: '/:id', component: TeamPageComponent },
  //   ]
  // },
];


@NgModule({
  imports: [
    RouterModule.forChild(websiterouting)
  ],
  exports: [RouterModule],

})
export class WebsiteRoutingModule { }
