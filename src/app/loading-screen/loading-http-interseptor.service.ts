import { Injectable } from '@angular/core';

import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingHttpInterseptorService implements HttpInterceptor {
  
  constructor(private loadingService: LoadingService) { }


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
