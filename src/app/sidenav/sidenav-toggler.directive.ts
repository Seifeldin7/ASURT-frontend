import { Directive, HostListener, ElementRef } from '@angular/core';
import { SidenavService } from './sidenav.service';

@Directive({
  selector: '[appSidenavToggler]'
})
export class SidenavTogglerDirective {

  constructor(private el: ElementRef, private sidenavService: SidenavService) { }

  @HostListener('click') onClick($event){
    this.sidenavService.sidenavToggle();
  }

}
