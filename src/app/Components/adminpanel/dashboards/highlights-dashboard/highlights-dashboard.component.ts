import { Component, OnInit } from '@angular/core';
import { Highlight } from 'src/app/Models/highlight.interface';
import { HighlightsService } from 'src/app/Services/adminpanel/highlights.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-highlights-dashboard',
  templateUrl: './highlights-dashboard.component.html',
  styleUrls: ['./highlights-dashboard.component.css']
})
export class HighlightsDashboardComponent implements OnInit {

  highlights_list:Highlight[] = [
    {
      id:0,
      title:'--',
      description:'--',
      image:'--',
      url:'--',
      active:false
    }
  ]

  filter:string = 'all';

  constructor(private highlightsService:HighlightsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.highlightsService.fetch_highlights().subscribe(highlights=>{
      this.highlights_list = highlights;
      this.activatedRoute.queryParams.subscribe(params=>{
        if(params.filter == 'active'){
          this.filter = 'active';
          this.highlights_list = this.highlightsService.get_active();
        }else{
          this.filter = 'all';
          this.highlights_list = highlights;
        }
      });
    });

  }

}
