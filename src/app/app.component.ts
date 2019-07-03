import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { footer_slideInAnimation } from './animation';
import {NgsRevealConfig} from 'ngx-scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    footer_slideInAnimation
  ],
  providers: [NgsRevealConfig]
})
export class AppComponent {
  title = 'RTWebsite19';
  constructor(config: NgsRevealConfig) {
  // customize default values of ngx-scrollreveal directives used by this component tree
  config.duration = 8000;
  config.easing = 'cubic-bezier(0,0,1,1.01)';

  //other options here
}
}
