import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Highlight } from 'src/app/Models/highlight.interface';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class HighlightsService {

  private highlights:Highlight[] = [];
  private onChangeHighlights = new Subject<Highlight[]>();

  constructor(private http:HttpClient,
              private toastr:ToastrService) { }

  fetch_highlights(){
    /**
     * Fetch highlights from database 
     * if highlights fetched before next without send another request
     */
    if(this.highlights.length > 0){
      setTimeout(() => {
        this.onChangeHighlights.next(this.highlights); 
      });
    }else{
      this.http.get<Highlight[]>('api/highlights/all/').subscribe(highlights=>{
        this.highlights = highlights;
        this.onChangeHighlights.next(this.highlights);
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
    return this.onChangeHighlights;
  }

  get_highlights(){
    return this.highlights.slice();
  }

  get_active(){
    return this.highlights.filter(el=> el.active);
  }

  delete_highlight(id:Number){
    this.http.delete('/api/highlights/'+ id +'/').subscribe((res:any)=>{
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
