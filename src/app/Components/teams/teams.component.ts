import { Component, OnInit } from '@angular/core';
import { Team,Achivement } from '../../Models/team.interface';
import { HttpClient } from '@angular/common/http';
import { TeamsService } from '../../Services/adminpanel/teams.service';
import { ActivatedRoute,Params,Router } from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {

  teams:Team[] = [];
  management_teams: Team[] = [];
  teams_type:string='';
  out:string='';

  constructor(private http:HttpClient,private ts: TeamsService,private route:ActivatedRoute,private router:Router) { }
  state='normal';
  ngOnInit() {
    this.ts.fetch_teams().subscribe(
      teams => {
        for (var team of teams) {
          if(team.team_type == "technical"){
            this.teams.push(team);
          }
          else if(team.team_type == "management"){
            this.management_teams.push(team);
          }
        }
        console.log(this.teams);
        console.log(this.management_teams);
      }
    );
    // this.route.params.subscribe(
    //   (params:Params) => {
    //     this.teams = [];
    //     this.management_teams = [];
    //     this.teams_type = params['type'];
    //     if(this.teams_type == "technical") this.out='Technical Teams';
    //     else if(this.teams_type == "managemant") this.out='Management Teams';
    //   });
    console.log(this.out);
    console.log(this.teams_type);


  }
}
