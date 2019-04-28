import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../Services/Events/events.service';
import { Evnt } from '../../../Models/event.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event:Evnt = new Evnt(null,'','','',[],'',null);
  id:number;
  events2:Evnt[]=[];
  constructor(private eventservice:EventService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    //this.event = new Event(1,"Formula","asdsdfhygfgfdefa","12-22-2013","scdg","racing",true);
    this.route.params.subscribe((params:Params)=>{
       
      this.id= +params['id'];
      
      this.eventservice.getEvents().subscribe(
        (events)=>{
          this.events2 = events;
          
          this.event=this.eventservice.getEvent(this.id);
        },error => {
        }
      );
      //console.log(this.eventservice.getEvent(this.id));
      //this.event=this.eventservice.getEvent(this.id);
    
  });
  }
  back(){
    this.router.navigate(['../events']);
  }
}
