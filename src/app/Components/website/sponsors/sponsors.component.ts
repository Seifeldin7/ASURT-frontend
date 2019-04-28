import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/app/Models/sponsor.interface'
import { SponsorsService } from 'src/app/Services/adminpanel/sponsors.service'


@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  sponsors: Sponsor[] = [
    { id: 1, image: "https://dummyimage.com/100x100/eeeeee/ffffff", url: "" },
    { id: 2, image: "https://dummyimage.com/100x100/eeeeee/ffffff", url: "" },]

  constructor(private sponsorsService: SponsorsService) { }

  ngOnInit() {
    this.sponsorsService.fetch_sponsors().subscribe(response => {
      this.sponsors = response;
    });
  }
}
