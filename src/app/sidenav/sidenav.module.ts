import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SidenavService } from './sidenav.service';
import { SidenavTogglerDirective } from './sidenav-toggler.directive';

@NgModule({
  declarations: [
    SidenavComponent,

    SidenavTogglerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidenavComponent,
    SidenavTogglerDirective
  ],
  providers:[
    SidenavService
  ]
})
export class SidenavModule { }
