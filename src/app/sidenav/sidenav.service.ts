import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private sidenaveExpanded:Subject<boolean> = new Subject();

  private lastStatus = false;
  constructor() {}

  sidenavToggle(){
    this.sidenaveExpanded.next(!this.lastStatus);
    this.lastStatus = ! this.lastStatus;
  }

  sidenavStatus(){
    return this.sidenaveExpanded;
  }

}
