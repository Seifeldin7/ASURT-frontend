import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/adminpanel/events.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Evnt } from '../../Models/event.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:Evnt[]=[];
  event:Evnt;
  view:boolean=false;

  constructor(private eventService:EventService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {

  this.eventService.fetch_Events().subscribe(
    (events)=>{
      this.events = events;
      this.eventService.setEvents(this.events);
    },error => {
      Swal.fire({
        title: 'Something went wrong!',
      })
    }
  );
  // this.events = [new Evnt(1,"formula","awesome event","22-2-123",[{id:1,image:"232"}],"dont know",true),
  // new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true),new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true),
  // new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true)];



  }
  onview(i:number){
    this.event = this.events[i];
    //this.view =true;
    this.router.navigate(['/events',i]);
  }


}
