import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Sponsor {
  id: Number,
  image: String,
  url: String,
}

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  sponsors: Sponsor[] = [
    { id: 1, image: "https://dummyimage.com/100x100/eeeeee/ffffff", url: "" },
    { id: 2, image: "https://dummyimage.com/100x100/eeeeee/ffffff", url: "" },]

  constructor(private http: HttpClient) { }

  getSponsors() {
    return this.http.get<Sponsor[]>("/api/sponsors/all")
  }

  ngOnInit() {
    this.getSponsors().subscribe(response => {
      this.sponsors = response;
    })
  }

}
