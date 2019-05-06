import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../Services/Events/events.service';
import { Evnt } from '../../../Models/event.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event:Evnt = new Evnt(null,'','','',[{image:null,id:null}],'',null);
  id:number;
  events2:Evnt[]=[];
  constructor(private eventservice:EventService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    //this.event = new Event(1,"Formula","asdsdfhygfgfdefa","12-22-2013","scdg","racing",true);
   // if(this.route.snapshot.params['id']){
    this.route.params.subscribe((params:Params)=>{
       
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
        }
      );
      //console.log(this.eventservice.getEvent(this.id));
      //this.event=this.eventservice.getEvent(this.id);
    
  });

  }
  // back(){
  //   this.router.navigate(['../events']);
  // }
}
