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
    return this.http.get<Evnt[]>('api/events/all/');
}
setEvents (events:Evnt[]){
     this.events =events;
}
getEvent(id:number){
    return this.events[id];
}

 }