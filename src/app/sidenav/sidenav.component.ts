import { Component, OnInit, Input } from '@angular/core';
import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input() sidenavStatus = false;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
    this.sidenavService.sidenavStatus().subscribe((status)=>{
      this.sidenavStatus = status;
    })
  }

}
