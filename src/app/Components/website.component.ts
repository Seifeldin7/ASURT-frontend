import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../animation';
import { NgsRevealConfig } from 'ngx-scrollreveal';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css'],
  animations: [
    slideInAnimation
  ],
  providers: [NgsRevealConfig]
})
export class WebsiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
