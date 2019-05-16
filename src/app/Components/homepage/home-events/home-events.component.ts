import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/Models/event.interface';
import { EventsService } from 'src/app/Services/adminpanel/events.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.css']
})
export class HomeEventsComponent implements OnInit {

  events: Event[] = [
    {
      id: 1,
      name: "FSUK",
      date: new Date("May 20 2019 21:00"),
      description: "ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam",
      status: true,
      image: [{ id: 1, image: "https://vid.alarabiya.net/images/2018/02/16/0a91af4a-384a-4d65-9c48-59bb767fa13e/0a91af4a-384a-4d65-9c48-59bb767fa13e_16x9_788x442.jpg" }],
      event_type: "string"
    },
    {
      id: 2,
      name: "Shell Eco Marathon",
      date: new Date("May 15 2019 21:00"),
      description: "f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ay kalam f ay kalam ",
      status: true,
      image: [{ id: 1, image: "https://vid.alarabiya.net/images/2018/02/16/0a91af4a-384a-4d65-9c48-59bb767fa13e/0a91af4a-384a-4d65-9c48-59bb767fa13e_16x9_788x442.jpg" }],
      event_type: "string"
    },
  ]
  constructor(private eventsService: EventsService, private router:Router) { }

  ngOnInit() {
    this.eventsService.fetch_Events().subscribe(response => {
      this.events = response.filter(el => el.status);
    });
  }
  onview(i:number){
    this.router.navigate(['/events',this.events[i].id]);
  }

}

