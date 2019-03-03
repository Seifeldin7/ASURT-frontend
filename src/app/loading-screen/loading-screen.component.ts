import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {
  
  public loadingScreenFlag = true;

  constructor(loadingService:LoadingService){

    loadingService.loadingStatus().subscribe((status)=>{
      this.loadingScreenFlag = status;
    });

  }

  ngOnInit() {
  }

}
