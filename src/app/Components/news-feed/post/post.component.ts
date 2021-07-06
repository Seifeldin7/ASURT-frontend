import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/Models/post.model';
import { DomSanitizer } from '@angular/platform-browser';
import { img } from 'src/app/Models/img.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  image:img
  len:number
  @Input() post:Post;
  @Input() index:number;
  //image=this.post[image][Image.length-1];
  
  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit() {
    if(this.post.image){
      this.len =this.post.image.length-1;
      //console.log(this.post.image[this.post.image.length-1]);
      this.image=this.post.image[this.len]['image'];
      //console.log(this.image);
    }
   
  }
  embedUrl(post){
  return  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+post.video);
  }
}
