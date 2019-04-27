import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/Events/events.service';
import { Evnt } from 'src/app/Models/event.model';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event:Evnt;
  name:string;
  constructor(private eventservice:EventService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    //this.event = new Event(1,"Formula","asdsdfhygfgfdefa","12-22-2013","scdg","racing",true);
    this.route.params.subscribe((params:Params)=>{
       
      this.name= params['name'];
      //this.event=this.eventservice.getEvent(this.name);
    
  });
  }

}
