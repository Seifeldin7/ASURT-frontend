import { Injectable } from '@angular/core';
import { Team, Achivement } from 'src/app/Models/team.interface';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

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


  private teams = [
    // this.team1
    // ,this.team2,
    // this.team3
  ];
  private onChangeTeams = new Subject<Team[]>();
  private onReceiveOneTeam = new Subject<Team>();

  constructor(private http:HttpClient,
              private toastr:ToastrService,
              private router:Router) { }

  fetch_teams(){
    if(this.teams.length > 0){
      /** If teams fetched before next without sending request */
      setTimeout(() => {
        this.onChangeTeams.next(this.teams);
      });
    }else{
      this.http.get<Team[]>('api/teams/').subscribe(
        (teams:Team[]) => {
          this.teams = teams;
          this.onChangeTeams.next(this.teams);
        },
        (err:any) => {
          if ('msg' in err.error) {
            this.toastr.error(err.error.msg, "Error")
          }
          else {
            this.toastr.error("Something went wrong", "Error")
          }
        }
      );
    }
    return this.onChangeTeams;
  }

  update_fetched_data(){
    this.teams = [];
    this.fetch_teams();
  }

  get_team_by_id(id:Number){
    if(this.teams.length > 0){
      /** if all teams fetched before get this team from array */
      let team = this.teams.find(el => el.id == id);
      if(team){
        setTimeout(() => {
          this.onReceiveOneTeam.next(team);
        });
        return this.onReceiveOneTeam;
      }
    }
    /** else fetch team from backend */
    this.http.get<Team>('api/teams/'+id+'/').subscribe(
      (team: Team) => {
        this.onReceiveOneTeam.next(team);
      },
      (err:any) => {
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      }
    );
    return this.onReceiveOneTeam;
  }

  post_team(data){
    this.teams = [];

    return this.http.post('api/teams/',{
      name: data.name,
      description: data.name,
      team_type: data.team_type,
      achievement: data.achievement,
      image: data.images
    });
  }

  update_team(id:Number,data){
    this.teams = [];

    return this.http.put('api/teams/'+id+'/',{
      name: data.name,
      description: data.name,
      team_type: data.team_type,
      achievement: data.achievement,
      image: data.images
    });
  }

  delete_team(id:Number){
    this.http.delete('api/teams/'+id+'/').subscribe(
      (res:any) => {
        if(res.status == true){
          this.toastr.success(res.msg,"Success");
          this.router.navigate(['adminpanel/teams'])
        }else{
          this.toastr.error(res.msg,"Error");
        }
      },
      (err:any) => {
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      }
    )
  }

}
