import { Injectable } from '@angular/core';
import { Profile } from '../../Components/profile/profile.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  editMode=new Subject<boolean>();
  editflag = false;
  private profile=new Profile('','','','','','','','','','','','','','','','','','');
   
  constructor(private http:HttpClient){}
  fetchProfile(){
  return this.http.get<Profile>('http://127.0.0.1:8000/api/Profile/');
  }
  EditProfile(data:Profile){
    return this.http.put<Profile>('http://127.0.0.1:8000/api/Profile/',data);
  }
  CreateProfile(data:Profile){
    return this.http.post<Profile>('https://82a7ef7f-568a-4903-8b53-c486645ab164.mock.pstmn.io/api/Profile/',data);
  }
  setProfile(p:Profile){
    this.profile =p;
  }
  getProfile(){
    return this.profile;
  }
  seteditMode(flag:boolean){
    this.editflag =flag;
  }
  geteditMode(){
    return this.editflag;
  }
  profileExist(){
    this.fetchProfile().subscribe(
      (response:Profile)=>{
        console.log(response)
        this.editMode.next(true);
        
       
      },
      err=>{
        
        this.editMode.next(false);
        
      }
    )
    
    
  }
}
