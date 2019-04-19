import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/post.model';
import { NewsFeedService } from 'src/app/Services/NewsFeed/news-feed.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { img } from 'src/app/Models/img.model';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {
  posts :Post[];
  img:img;
  pageID:number;
  prev:number;
  next:number;
  prevExist=false;
  nextExist=false;
  loaded=false;
  constructor(private newsService:NewsFeedService,private route :ActivatedRoute,private router :Router ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params)=>{
        this.pageID=+params['id']
        this.newsService.setPageId(+params['id']);
      }
    );
    this.newsService.getPosts().subscribe(
      (news)=>{
        this.posts=news['articles'];
        this.loaded=true;
        if(this.pageID<news['num_pages'])
        {
          this.nextExist=true;
        }
        if(this.pageID>1){
          this.prevExist=true;
        }
        //console.log(news);
        //console.log(this.posts);
        //console.log(this.posts[0].video);

      }
    );
  }


  onPrevious(){
    this.prev=parseInt(this.pageID+'') - 1;
    this.router.navigate(['news/'+this.prev]);
  }
  onNext(){
    this.next=parseInt(this.pageID+'') + 1;
    this.router.navigate(['news/'+this.next]);
  }

}
