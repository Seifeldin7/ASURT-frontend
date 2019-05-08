import { Component, OnInit } from '@angular/core';
import { Sponsor } from 'src/app/Models/sponsor.interface'
import { SponsorsService } from 'src/app/Services/adminpanel/sponsors.service'
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

  sponsors: Sponsor[] = [
    { id: 1, image: "https://dummyimage.com/1800x901/000/fff", url: "" },
    { id: 2, image: "https://dummyimage.com/1800x902/000/fff", url: "" },
    { id: 3, image: "https://dummyimage.com/1800x903/000/fff", url: "" },
    { id: 4, image: "https://dummyimage.com/1800x904/000/fff", url: "" },
    { id: 5, image: "https://dummyimage.com/1800x905/000/fff", url: "" },]

  constructor(private sponsorsService: SponsorsService) { }

  ngOnInit() {
    this.sponsorsService.fetch_sponsors().subscribe(response => {
      this.sponsors = response;
    });

    $('#recipeCarousel').carousel({
      interval: 1500
    })

    $('.carousel .carousel-item').each(function () {
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      for (var i = 0; i < 4; i++) {
        next = next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
      }
    });
    $('.carousel').carousel({
      pause: "false"
    });

  }
}
