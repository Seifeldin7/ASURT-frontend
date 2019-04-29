import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/Models/event.interface';
import { EventsService } from 'src/app/Services/adminpanel/events.service'

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.css']
})
export class HomeEventsComponent implements OnInit {


  events: Event[] = []
  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.fetch_Events().subscribe(response => {
      this.events = response.filter(el => el.status);
    });
  }

}

