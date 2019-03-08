import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }
}

/**
 * LoadingScreen Service
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
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

/**
 * LoadingScreen Interseptor
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingHttpInterseptorService implements HttpInterceptor {
  constructor(private loadingService: LoadingScreenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      this.loadingService.showLoading();
    return next.handle(req).pipe( tap((event:HttpEvent<any>)=>{
      if(event instanceof HttpResponse){
        this.loadingService.hideLoading();
      }
    }, (err:any)=>{
      this.loadingService.hideLoading();
    }) );
  }
}
