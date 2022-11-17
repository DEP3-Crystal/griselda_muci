import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Article } from './model/Article';
import { ArticleService } from './services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
 
  articleSubscription=new Subscription();
  articleUpdateSubscription=new Subscription();
  articleList:Article[]=[];
  selectedArticleId:string='';

  articleExample={
    title:'',
    tag:'',
    author:'',
    date:'',
    imgUrl:'',
    saying:'',
    content:''
  }

  constructor(
    private articleService: ArticleService
  ) {
  }
   
  showModal:boolean=false;
  ngOnInit() {

    this.getArticles();

  }
  toogleAddArticle(){
    this.showModal=!this.showModal
    console.log("Modali eshte shfaqur")

    
  }
  toogleCancelModal(){
    this.showModal=!this.showModal
   

    
  }

  
  getArticles() {
    this.articleSubscription = this.articleService.getArticles().subscribe((response) => {
      console.log(response);
      this.articleList = response;
    });
  }
  

  

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
