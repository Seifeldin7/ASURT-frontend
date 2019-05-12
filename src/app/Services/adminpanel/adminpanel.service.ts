import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminpanelService {

  constructor(private http:HttpClient,
              private toastr:ToastrService) { }

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

  /** For All services */
  delete_image_from(img_type:string,obj_id:Number,img_id:Number){
    let type_id = (img_type =='team')         ? 0 :
                  (img_type =='event')        ? 2 :
                  (img_type =='highlight')    ? 3 :
                  (img_type =='news-feed')    ? 4 : null;

    /** change get request to delete */
    return this.http.get('api/remove-from/'+type_id+'/'+obj_id+'/'+img_id+'/').subscribe(
      resonse=>{
        this.toastr.info('Old image deleted');
      },
      err => {
        this.toastr.error('Something went wrong while deleting old image');
      }
    );
  }

}
