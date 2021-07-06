import { Component, OnInit, Input } from '@angular/core';
import { Highlight } from 'src/app/Models/highlight.interface';
import { HighlightsService } from 'src/app/Services/adminpanel/highlights.service';

@Component({
  selector: 'app-highlight-card',
  templateUrl: './highlight-card.component.html',
  styleUrls: ['./highlight-card.component.css']
})
export class HighlightCardComponent implements OnInit {

  @Input() card:Highlight = null;
  constructor(private highlightService:HighlightsService) { }

  ngOnInit() {
  }

  delete_highlight(){
    if(confirm("Are you sure to delete this")) {
      this.highlightService.delete_highlight(this.card.id);
    }
  }

}
