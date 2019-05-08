import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { EventsService } from 'src/app/Services/adminpanel/events.service';
import { Event } from '../../../Models/event.interface';
=======
import { EventService } from '../../../Services/Events/events.service';
import { Evnt } from '../../../Models/event.model';
>>>>>>> c83181eb79b6389c935531e73e11c71fa4f95e2f
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
<<<<<<< HEAD
  event:Event = null;
  id:number;
  events2:Event[]=[];
  constructor(private eventservice:EventsService,private route:ActivatedRoute,private router:Router) { }
=======
  event:Evnt = new Evnt(null,'','','',[{image:null,id:null}],'',null);
  id:number;
  events2:Evnt[]=[];
  constructor(private eventservice:EventService,private route:ActivatedRoute,private router:Router) { }
>>>>>>> c83181eb79b6389c935531e73e11c71fa4f95e2f

  ngOnInit() {
    //this.event = new Event(1,"Formula","asdsdfhygfgfdefa","12-22-2013","scdg","racing",true);
   // if(this.route.snapshot.params['id']){
    this.route.params.subscribe((params:Params)=>{
<<<<<<< HEAD

      this.id= +params['id'];

      this.eventservice.fetch_Events().subscribe(
        (events)=>{
          this.events2 = events;

          this.event=this.eventservice.get_events_by_id(this.id);
        },error => {
=======
       
      this.id= +params['id'];
      
      this.eventservice.getEvents().subscribe(
        (events)=>{
          this.events2 = events;
          if(this.eventservice.getEvent(this.id)){
            this.event=this.eventservice.getEvent(this.id);
            console.log(this.event.image[this.event.image.length-1].image);
          }
          else{
            alert("Event doesn't exist");
            this.router.navigate(['../events/0']);
          }
        },error => {
          alert("Error");
>>>>>>> c83181eb79b6389c935531e73e11c71fa4f95e2f
        }
      );
      //console.log(this.eventservice.getEvent(this.id));
      //this.event=this.eventservice.getEvent(this.id);
<<<<<<< HEAD

  });
  }
  back(){
    this.router.navigate(['../events']);
  }
=======
    
  });

  }
  // back(){
  //   this.router.navigate(['../events']);
  // }
>>>>>>> c83181eb79b6389c935531e73e11c71fa4f95e2f
}
