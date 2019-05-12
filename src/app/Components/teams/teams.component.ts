import { Component, OnInit } from '@angular/core';
import { Team,Achivement } from '../../Models/team.interface';
import { HttpClient } from '@angular/common/http';
import { TeamsService } from '../../Services/adminpanel/teams.service';
import { ActivatedRoute,Params,Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  // achiv:Achivement = new Achivement("achiv1","pos1","descrip1","https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",null);
  // achiv2:Achivement = new Achivement("achiv2","pos2","descrip2","https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",null);
  // achiv3:Achivement = new Achivement("achiv3","pos3","descrip3","https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",null);
  //
  //
  //
  // team1:Team =  new Team(1,"Team1","description1",["https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",""],[this.achiv,this.achiv2,this.achiv3],"managemant");
  //
  // team2:Team =  new Team(2,"Team2","description2",["https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",""],[this.achiv,this.achiv2,this.achiv3],"technical");
  // team3:Team =  new Team(3,"Team3","description3",["https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",""],[this.achiv,this.achiv2,this.achiv3],"managemant");
  //
  //
  teams:Team[] = [
    // this.team1
    // ,this.team2,
    // this.team3
  ];
  management_teams  = [
    // this.team3,this.team4
  ];
  teams_type:string='';
  out:string='';

  constructor(private http:HttpClient,private ts: TeamsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.ts.fetch_teams().subscribe(
      teams => {
        this.teams = teams;
        console.log(this.teams);
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


  }
  // onclick(index:number){
  //   this.teams[index].visiable = ! this.teams[index].visiable;
  //   console.log(this.teams);
  // }
}
