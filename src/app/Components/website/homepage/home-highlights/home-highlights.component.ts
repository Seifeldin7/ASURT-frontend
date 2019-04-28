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

  highlights: Highlight[] = []
  constructor(config: NgbCarouselConfig, private highlightsService: HighlightsService) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
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
