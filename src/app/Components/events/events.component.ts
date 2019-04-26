import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/Services/events/events.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Evnt } from '../../Models/event.model';

declare var jquery: any;
declare var $: any;

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
    
  this.eventService.getEvents().subscribe(
    (events)=>{
      console.log(events)
      this.events = events;
      this.eventService.setEvents(this.events);
    },error => {
      console.log(error)
      Swal.fire({
        
        title: 'Something went wrong!',

      })
    }
  );
  $('#recipeCarousel').carousel({
    interval: 1500
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
  
   
 
  }
  onview(i:number){
    this.event = this.events[i];
    //this.view =true;
    this.router.navigate(['/events',i]);
  }
  
 
}
