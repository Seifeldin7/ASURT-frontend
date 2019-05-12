import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbar_status:boolean = false;
  scroll_position:number = 100000;
  mouseHideTimeOut = null;

  @ViewChild('navbar_wrapper') navbar_wrapper:ElementRef;
  @ViewChild('navbar') navbar:ElementRef;

  constructor(private renderer2:Renderer2) { }

  ngOnInit() {
  }

  @HostListener('document:scroll',[])
  onWindowScroll(){
    if(window.pageYOffset < this.scroll_position){
      /** Scroll up */
      this.renderer2.removeClass(this.navbar_wrapper.nativeElement,'hide');
      clearTimeout(this.mouseHideTimeOut);
    }
    else if(window.pageYOffset > this.navbar.nativeElement.offsetHeight){
      /** scroll down and position > navbar hieght */
      this.renderer2.addClass(this.navbar_wrapper.nativeElement,'hide');
    }else{
      this.renderer2.removeClass(this.navbar_wrapper.nativeElement,'hide');
      clearTimeout(this.mouseHideTimeOut);
    }
    
    this.scroll_position = window.pageYOffset;
  }
  
  @HostListener('document:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if(event.clientY < 50){
      clearTimeout(this.mouseHideTimeOut);
      this.renderer2.removeClass(this.navbar_wrapper.nativeElement,'hide');
    }else if(event.clientY > 50 && 
              window.pageYOffset > this.navbar.nativeElement.offsetHeight &&
              ! this.navbar_wrapper.nativeElement.classList.contains('hide')){
      this.mouseHideTimeOut = setTimeout(()=>{
        this.renderer2.addClass(this.navbar_wrapper.nativeElement,'hide');
      },500);
    }
  }

  toggle_navbar(){
    this.navbar_status = !this.navbar_status;
  }

}
