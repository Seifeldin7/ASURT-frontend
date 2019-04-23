import { Evnt } from '../../Models/event.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class EventService{

private events:Evnt[] =[];

constructor (private http:HttpClient){}


getEvents (){
    return this.http.get<Evnt>('api/events/all/');
}
setEvents (events:Evnt[]){
     this.events =events;
}
getEvent(id:number){
    return this.events[id];
}
// addEvent(event:Event){
//     this.events.push(event);
// } 
// updateEvent(name:string,event:Event){
//     var id:number;
//     for(let i =0 ;i<this.events.length;i++){
//         if(this.events[i].name === "name"){
//             id = i;
//             break;
//         }
//     }
//     this.events[id]=event;
// }
// deleteEvent(name:string){
//     var id:number;
//     for(let i =0 ;i<this.events.length;i++){
//         if(this.events[i].name === "name"){
//             id = i;
//             break;
//         }
//     }
//     this.events.splice(id,1);
//   }
 }