import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/Models/event.interface';
import { EventsService } from 'src/app/Services/adminpanel/events.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events_list:Event[] = [
    {
      id:0,
      name:'thegreatevent',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ',
      image:'https://dummyimage.com/300x400/c263c2/0011ff.jpg',
      date:null,
      status:true,
      type:'competition'
    },
    {
      id:1,
      name:'thegreatevent',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et',
      image:'https://dummyimage.com/300x400/c263c2/0011ff.jpg',
      date:null,
      status:true,
      type:'competition'
    }
  ]
  constructor(private eventsService:EventsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.eventsService.fetch_Events().subscribe(events=>{
    //   this.events_list = events;
    // });
  }

}
