import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminpanelService {

  constructor() { }

  /** General */

  /** Sidebar */
  private admin_sidebar_status = true;
  private admin_sidebar_status_emmitter = new Subject<boolean>();
  admin_sidebar_toggle(){
    this.admin_sidebar_status = !this.admin_sidebar_status;
    this.admin_sidebar_status_emmitter.next(this.admin_sidebar_status);
  }
  get_sidebar_status(){
    return this.admin_sidebar_status_emmitter;
  }
  /** ./Sidebar */


}
