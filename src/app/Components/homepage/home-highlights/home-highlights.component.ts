import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Highlight } from 'src/app/Models/highlight.interface'
import { HighlightsService } from 'src/app/Services/adminpanel/highlights.service'

@Component({
  selector: 'app-home-highlights',
  templateUrl: './home-highlights.component.html',
  styleUrls: ['./home-highlights.component.css']
})
export class HomeHighlightsComponent implements OnInit {

  highlights: Highlight[] = [{
    id: 1,
    title: "one",
    description: "bla bla bla bla blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    image: [{
      id: 1, image: "https://dummyimage.com/1800x999/000/fff"
    }],
    url: "nth",
    active: true
  }]
  constructor(config: NgbCarouselConfig, private highlightsService: HighlightsService) {
    // customize default values of carousels used by this component tree
    config.interval = 4000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit() {
    this.highlightsService.fetch_highlights().subscribe(response => {
      this.highlights = response.filter(el => el.active);
    });
  }

}
