import { Component, OnInit } from '@angular/core';
import { Evnt } from 'src/app/Models/event.model';
import { EventService } from 'src/app/Services/Events/events.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:Evnt[]=[];
  event:Evnt;
  view:boolean=false;
  obj ={}
  constructor(private eventService:EventService) { }

  ngOnInit() {
    
  this.eventService.getEvents().subscribe(
    (events)=>{
      this.events = events;
    },error => {
      Swal.fire({
        title: 'Something went wrong!',
      })
    }
  );
  //  this.events = [new Evnt(1,"formula","awesome event","22-2-123",[{id:1,image:"232"}],"dont know",true),
  // new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true),new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true),
  // new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true)];
 
  }
  onview(i:number){
    this.event = this.events[i];
    this.view =true;
  }
  back(){
    this.view =false;
  }
}
