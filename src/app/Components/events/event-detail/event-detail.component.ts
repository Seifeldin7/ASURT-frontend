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

    this.route.params.subscribe((params:Params)=>{
       
      this.id= +params['id'];
      
      this.eventservice.getEvents().subscribe(
        (events)=>{
          this.events2 = events;
          if(this.events2[this.id]){
            this.event  = this.events2[this.id];
          }
          else{
            alert("Event doesn't exist");
            this.router.navigate(['../events/0']);
          }
          
        },error => {
          alert("Error");
        }
      );
 
    
  });

  }

}
