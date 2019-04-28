import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsComponent } from './events.component';
import { EventRoutingModule } from 'src/app/Routing/Events/events.router';

@NgModule({
    declarations: [
      EventsComponent,
      EventDetailComponent
    ],
    imports: [
      CommonModule,
      EventRoutingModule,

    ]
   
  })
  export class EventsModule { }
  