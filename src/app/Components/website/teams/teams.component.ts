import { Component, OnInit } from '@angular/core';
import { Team,Achivement } from '../../../Models/team.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  achiv:Achivement = new Achivement("achiv1","pos1","descrip1","https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",null);
  team1:Team =  new Team("Team1","description1",["https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",""],[this.achiv],'tech');
  // team2:Team =  new Team("Team2","description2",false,"https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg");
  // team3:Team =  new Team("Team3","description3",false,"https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg");
  // team4:Team =  new Team("Team4","description4",false,"https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",);
  teams = [
    this.team1
    // ,this.team2
  ];
  management_teams  = [
    // this.team3,this.team4
  ];

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get<Team[]>('api/teams/').subscribe(
      (response:any)=>{
        this.teams = response;
      }
    );
  }
  onclick(index:number){
    this.teams[index].visiable = ! this.teams[index].visiable;
    console.log(this.teams);
  }
}
