import { Injectable } from '@angular/core';
import { Post } from 'src/app/Models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {
  pageId:number;
  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get('news/'+this.pageId)
  }
  setPageId(pageid){
    this.pageId=pageid;
  }


}
