import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { EventsService } from 'src/app/Services/adminpanel/events.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Event } from '../../Models/event.interface';
=======
import { EventService } from '../../Services/Events/events.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Evnt } from '../../Models/event.model';

declare var jquery: any;
declare var $: any;
>>>>>>> c83181eb79b6389c935531e73e11c71fa4f95e2f

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:Event[]=[];
  event:Event;
  view:boolean=false;
<<<<<<< HEAD

  constructor(private eventService:EventsService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {

  this.eventService.fetch_Events().subscribe(
    (events)=>{
      this.events = events;
      //this.eventService.setEvents(this.events);
    },error => {
=======
  activeEvent:Evnt = new Evnt(null,'','','',[{image:null,id:null}],'',null);
  events2:Evnt[];
  constructor(private eventService:EventService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
   
  this.eventService.getEvents().subscribe(
    (events)=>{
      
     this.events = events;
      this.activeEvent =this.events[0];
      
      this.events2 = this.events.slice(1);
      this.eventService.setEvents(this.events);
    },
    error => {
      
>>>>>>> c83181eb79b6389c935531e73e11c71fa4f95e2f
      Swal.fire({
        
        title: 'Something went wrong!',

      })
    }
  );
<<<<<<< HEAD
  // this.events = [new Evnt(1,"formula","awesome event","22-2-123",[{id:1,image:"232"}],"dont know",true),
  // new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true),new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true),
  // new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true)];



=======
  
  $('#recipeCarousel').carousel({
    interval: 4000
  })
  $('.carousel .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    
    for (var i=0;i<4;i++) {
        next=next.next();
        if (!next.length) {
        	next = $(this).siblings(':first');
      	}
        
        next.children(':first-child').clone().appendTo($(this));
      }
});
    $('.carousel').carousel({
      pause: "false"
    });
  // this.events = [new Evnt(1,"formula","awesome event","22-2-123",[{id:1,image:"232"}],"dont know",true),
  // new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true),new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true),
  // new Evnt(2,"rov","awesome event","22-2-143",[{id:1,image:"232"}],"dont know2",true)];
  
   
 
>>>>>>> c83181eb79b6389c935531e73e11c71fa4f95e2f
  }
  onview(i:number){
    this.event = this.events[i];
    //this.view =true;
    this.router.navigate(['/events',i]);
  }
<<<<<<< HEAD


=======
  
 
>>>>>>> c83181eb79b6389c935531e73e11c71fa4f95e2f
}
