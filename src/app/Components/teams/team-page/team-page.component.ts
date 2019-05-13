import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { TeamsService } from '../../../Services/adminpanel/teams.service';
import { Team,Achivement } from '../../../Models/team.interface';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  id:number;
  team:Team=null;
  achivements : Achivement[]=null;
  constructor(private route:ActivatedRoute,private router:Router,private ts: TeamsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params) => {
        console.log(params);
        this.id = +params['id'];
        this.ts.get_team_by_id(this.id).subscribe(
          team =>{
            this.team = team;
            this.achivements=team.achievement;
            console.log(this.team);
          }
        );
        // console.log(this.id);
        // console.log(this.team);
        // console.log(this.team.id);
        // console.log(this.team.name);
        // console.log(this.team.description);
        // console.log(this.team.achivements);
        // this.recipe1 = this.rs.getRecipe(this.id);
      }
    );
  }

}
