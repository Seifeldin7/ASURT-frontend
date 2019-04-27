import { Injectable } from '@angular/core';
import { Team, Achivement } from '../../Models/team.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class TeamsService {

  teams_got = new Subject<Team[]>();

  achiv:Achivement = new Achivement("achiv1","pos1","descrip1","https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",null);
  achiv2:Achivement = new Achivement("achiv2","pos2","descrip2","https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",null);
  achiv3:Achivement = new Achivement("achiv3","pos3","descrip3","https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",null);



  team1:Team =  new Team(1,"Team1","description1",["https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",""],[this.achiv,this.achiv2,this.achiv3],"managemant");

  team2:Team =  new Team(2,"Team2","description2",["https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",""],[this.achiv,this.achiv2,this.achiv3],"technical");
  team3:Team =  new Team(3,"Team3","description3",["https://images.pexels.com/photos/12801/pexels-photo-12801.jpeg?cs=srgb&dl=auto-racing-car-wallpapers-f1-12801.jpg&fm=jpg",""],[this.achiv,this.achiv2,this.achiv3],"managemant");


  teams = [
    this.team1
    ,this.team2,
    this.team3
  ];

  constructor(private http:HttpClient){ }

  get_all_teams(){
    // this.http.get<Team[]>('api/teams/').subscribe(
    //   (response:any)=>{
    //     this.teams = response;
    //   }
    // );
    //this.teams_got.next(this.teams.slice());
    return this.teams.slice();
  }

  get_team(id:number){
    // console.log(this.teams.filter(el=> el.id == id ));
    return this.teams.filter(el=> el.id == id );

  }

}
