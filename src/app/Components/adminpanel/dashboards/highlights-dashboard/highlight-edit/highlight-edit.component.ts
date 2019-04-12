import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Highlight } from 'src/app/Models/highlight.interface';
import { HighlightsService } from 'src/app/Services/adminpanel/highlights.service';

@Component({
  selector: 'app-highlight-edit',
  templateUrl: './highlight-edit.component.html',
  styleUrls: ['./highlight-edit.component.css']
})
export class HighlightEditComponent implements OnInit {

  card:Highlight = null;

  constructor(private activatedRoute:ActivatedRoute,
              private highlightsServices:HighlightsService) {}

  ngOnInit() {
    if(this.activatedRoute.snapshot.params['id']){
      this.highlightsServices.get_highlights_by_id(this.activatedRoute.snapshot.params['id']).subscribe(card=>{
        this.card = card;
      })
    }
  }

}
