import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Post } from 'src/app/Models/post.model';
import { DomSanitizer } from '@angular/platform-browser';
import { img } from 'src/app/Models/img.model';
//import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  // animations: [
  //   trigger('scrollAnimation', [
  //     state('show', style({
  //       opacity: 1,
  //       transform: "translateX(0)"
  //     })),
  //     state('hide',   style({
  //       opacity: 0,
  //       transform: "translateX(-90%)"
  //     })),
  //     transition('show => hide', animate('700ms ease-out')),
  //     transition('hide => show', animate('700ms ease-in'))
  //   ])
  // ]
})
export class PostComponent implements OnInit {
  image:img['image'];
  len:number;
  imgRight=true;
  state = 'show'
  small :boolean;


  @Input() post:Post;
  @Input() index:number;


  @HostListener('window:resize', ['$event'])
  onResize(event){
    if (window.innerWidth <= 770) {
      this.small = true;
    } else {
      this.small = false;
    }

  }
  constructor(private sanitizer:DomSanitizer,public el:ElementRef) {

    if (window.innerWidth <= 770) {
      this.small = true;
    } else {
      this.small = false;
    }
  }
  //@HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   const componentPosition = this.el.nativeElement.offsetTop
  //   const scrollPosition = window.pageYOffset+550
  //
  //   if (scrollPosition <= componentPosition) {
  //     this.state = 'hide'
  //   } else {
  //     this.state = 'show'
  //   }
  //
  // }

  ngOnInit() {
    //console.log(this.post);
    if(this.index%2==0){
      this.imgRight=false;
    }
    if(this.post.image != null){
      this.len =this.post.image.length-1;
      //console.log(this.post.image[this.post.image.length-1]);
      this.image=this.post.image[this.len]['image'];
      //console.log(this.image);
    }

  }
  embedUrl(post){
  // return  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+post.video);
  return  this.sanitizer.bypassSecurityTrustResourceUrl(post.video);
  }
}
