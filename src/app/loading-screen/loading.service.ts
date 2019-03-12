import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingEmmiter: Subject<boolean> = new Subject();

  constructor(private router:Router) { 
    router.events.subscribe(( event: RouterEvent )=>{
      if(event instanceof NavigationStart){
        this.showLoading();
      }
      if(event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
        this.hideLoading();
      }
    })
  }


  loadingStatus(){
    return this.loadingEmmiter;
  }

  showLoading(){
    this.loadingEmmiter.next(true);
  }

  hideLoading(){
    this.loadingEmmiter.next(false);
  }

}
