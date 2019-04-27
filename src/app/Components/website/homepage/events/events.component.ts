import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Event {
  id: Number,
  name: string,
  date: Date,
  description: string,
  visible: boolean,
  image: string,
  type: string
}


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {


  events: Event[] = [
    { id: 1, name: "event 1", description: "bla bla bla bla bla bla bla bla bla", image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg", date: new Date("2020-03-16"), visible: true, type: "y" },
    { id: 2, name: "event 2", description: "bla bla bla bla bla bla bla bla bla bla bla bla", image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg", date: new Date("2020-03-16"), visible: true, type: "x" },
    { id: 2, name: "event 2", description: "bla bla bla bla bla bla bla bla bla bla bla bla", image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg", date: new Date("2020-03-16"), visible: true, type: "x" },]

  constructor(private http: HttpClient) { }

  getActiveEvents() {
    return this.http.get<Event[]>("/api/highlights/active/")
  }

  ngOnInit() {
    this.getActiveEvents().subscribe(response => {
      this.events = response;
    })
  }

}

