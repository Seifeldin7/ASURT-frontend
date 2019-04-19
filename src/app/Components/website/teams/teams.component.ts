import { Component, OnInit } from '@angular/core';
import { Team,Achivement } from '../../../Models/team.interface';
import { HttpClient } from '@angular/common/http';
import { TeamsService } from '../../../Services/adminpanel/teams.service';
import { ActivatedRoute,Params,Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {


  teams:Team[] = [];
  teams_type:string='';
  out:string='';

  constructor(private http:HttpClient,private ts: TeamsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.ts.fetch_teams().subscribe(
      teams => {
        this.teams = teams;
      }
    );
    this.route.params.subscribe(
      (params:Params) => {
        this.teams_type = params['type']
      });
    if(this.teams_type == "technical") this.out='Technical Teams';
    else this.out='Management Teams';
    console.log(this.out);
    console.log(this.teams_type);
    console.log(this.teams);

  }
  // onclick(index:number){
  //   this.teams[index].visiable = ! this.teams[index].visiable;
  //   console.log(this.teams);
  // }
}
