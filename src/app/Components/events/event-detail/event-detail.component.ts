import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/Services/adminpanel/events.service';
import { Event } from '../../../Models/event.interface';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event:Event = null;
  id:number;
  events2:Event[]=[];
  constructor(private eventservice:EventsService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    //this.event = new Event(1,"Formula","asdsdfhygfgfdefa","12-22-2013","scdg","racing",true);
   // if(this.route.snapshot.params['id']){
    this.route.params.subscribe((params:Params)=>{

      this.id= +params['id'];

      this.eventservice.fetch_Events().subscribe(
        (events)=>{
          this.events2 = events;
          if(this.eventservice.get_events_by_id(this.id)){
            this.eventservice.get_events_by_id(this.id).subscribe(
              event=>{
                this.event= event;
              }
            );
            console.log(this.event.image[this.event.image.length-1].image);
          }
          else{
            alert("Event doesn't exist");
            this.router.navigate(['../events/0']);
          }
        },error => {
          alert("Error");
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
