import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from '../../Components/events/events.component';
import { EventDetailComponent } from '../../Components/events/event-detail/event-detail.component';

const EventRoutes: Routes = [
    {
      path: '', component: EventsComponent,  children: [
<<<<<<< HEAD
        { path: ':id', component: EventDetailComponent },
=======
        
        { path: ':id', component: EventDetailComponent },
        { path: '**', redirectTo: '/events/0' },
>>>>>>> c83181eb79b6389c935531e73e11c71fa4f95e2f
        
      ]
    },
  ];
  
  @NgModule({
    imports: [
      RouterModule.forChild(EventRoutes)
    ],
    exports: [RouterModule],
  
  })
  export class EventRoutingModule { }