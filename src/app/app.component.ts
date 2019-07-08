import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { footer_slideInAnimation } from './animation';
// import {NgsRevealConfig} from 'ngx-scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    footer_slideInAnimation
  ],
  // providers: [NgsRevealConfig]
})
export class AppComponent {
  title = 'RTWebsite19';

}
