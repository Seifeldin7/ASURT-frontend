import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/Models/event.interface';
import { EventsService } from 'src/app/Services/adminpanel/events.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css']
})
export class EventsDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}
