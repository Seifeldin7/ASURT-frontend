import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/Models/post.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post:Post;
  @Input() index:number;
  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
   
  }
  embedUrl(post){
  return  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+post.video);
  }
}
