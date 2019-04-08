import { Injectable } from '@angular/core';
import { User } from 'src/app/Models/user';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users:User[] = [];
  private onChangeUsers = new Subject<User[]>();

  private groups:string[] = [];
  private onChangeGroups = new Subject<string[]>();

  constructor(private http:HttpClient,
              private toastr:ToastrService) { }

  fetch_users(){
    /**
     * Fetch users from database 
     * if users fetched before next without send another request
     */
    if(this.users.length > 0){
      setTimeout(() => {
        this.onChangeUsers.next(this.users); 
      });
    }else{
      this.http.get<User[]>('api/users/all/').subscribe(users=>{
        this.users = users;
        this.onChangeUsers.next(this.users);
      },
      err=>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      })
    }
    return this.onChangeUsers;
  }

  get_users(){
    return this.users.slice();
  }

  fetch_groups(){
    /**
     * Fetch groups from database 
     * if groups fetched before next without send another request
     */
    if(this.groups.length > 0){
      setTimeout(() => {
        this.onChangeGroups.next(this.groups); 
      });
    }else{
      this.http.get<string[]>('api/groups/all/').subscribe(groups=>{
        this.groups = groups;
        this.onChangeGroups.next(this.groups);
      },
      err=>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      })
    }
    return this.onChangeGroups;
  }

  update_user_group(updated_group:string,user_id:number){
    this.http.put('api/user/'+user_id+'/',{
      group:updated_group
    }).subscribe((response:any)=>{
      if(response.status == true){
        this.toastr.success(response.msg,"Success");
        let user_index = this.users.findIndex(user=>{
          return user.id == user_id
        })
        this.users[user_index].group = updated_group;
        console.log(this.users)
      }else{
        this.toastr.error(response.msg,"Success");
      }
    },err=>{
      if ('msg' in err.error) {
        this.toastr.error(err.error.msg, "Error")
      }
      else {
        this.toastr.error("Something went wrong", "Error")
      }
    })
  }

}
