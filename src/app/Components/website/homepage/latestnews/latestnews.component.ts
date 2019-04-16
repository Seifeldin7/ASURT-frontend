import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

interface Highlight {
  id: Number,
  title: String,
  description: String,
  image: String,
  url: String,
  active: boolean
}

@Component({
  selector: 'app-latestnews',
  templateUrl: './latestnews.component.html',
  styleUrls: ['./latestnews.component.css']
})
export class LatestnewsComponent implements OnInit {

  highlights: Highlight[] = [
    { id: 1, title: "slide 1", description: "lorem", image: "https://dummyimage.com/1920x720/eeeeee/ffffff", url: "", active: true },
    { id: 2, title: "slide 2", description: "bla bla", image: "https://dummyimage.com/1920x720/eeeeee/ffffff", url: "", active: true },]

  constructor(config: NgbCarouselConfig, private http: HttpClient) {
    // customize default values of carousels used by this component tree
    config.interval = 2000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  getActiveHighlights() {
    return this.http.get<Highlight[]>("/api/highlights/active/")
  }

  ngOnInit() {
    this.getActiveHighlights().subscribe(response => {
      this.highlights = response;
    })
  }

}
