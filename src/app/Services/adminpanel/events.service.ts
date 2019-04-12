import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from 'src/app/Models/event.interface';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private events:Event[] = [];
  private onChangeEvents = new Subject<Event[]>();

  constructor(private http:HttpClient,
              private toastr:ToastrService) { }

  fetch_Events(){
    /**
     * Fetch highlights from database
     * if highlights fetched before next without send another request
     */
    if(this.events.length > 0){
      setTimeout(() => {
        this.onChangeEvents.next(this.events);
      });
    }else{
      this.http.get<Event[]>('api/events/all/').subscribe(events=>{
        this.events = events;
        this.onChangeEvents.next(this.events);
      },
      err=>{
        if ('msg' in err.error) {
          this.toastr.error(err.error.msg, "Error")
        }
        else {
          this.toastr.error("Something went wrong", "Error")
        }
      })
    }
    return this.onChangeEvents;
  }

  get_events(){
    return this.events.slice();
  }

  get_active(){
    return this.events.filter(el=> el.status);
  }

  delete_event(id:Number){
    this.http.delete('/api/events/'+ id +'/').subscribe((res:any)=>{
      if(res.status == true){
        this.toastr.success(res.msg,"Success");
      }else{
        this.toastr.error(res.msg,"Success");
      }
    },(err)=>{
      if ('msg' in err.error) {
        this.toastr.error(err.error.msg, "Error")
      }
      else {
        this.toastr.error("Something went wrong", "Error")
      }
    })
  }

}
