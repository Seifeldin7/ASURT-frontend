import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animation';
import {NgsRevealConfig} from 'ngx-scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ],
  providers: [NgsRevealConfig]
})
export class AppComponent {
  title = 'RTWebsite19';
  constructor(config: NgsRevealConfig) {
  // customize default values of ngx-scrollreveal directives used by this component tree
  config.duration = 8000;
  config.easing = 'cubic-bezier(.29,.32,.72,.75)';

  //other options here
}
}
