import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsComponent } from './events.component';
import { EventRoutingModule } from 'src/app/Routing/Events/events.router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
      EventsComponent,
      EventDetailComponent
    ],
    imports: [
      CommonModule,
      EventRoutingModule,
      NgbModalModule,
      NgbModule.forRoot(),
    ]
   
  })
  export class EventsModule { }
  