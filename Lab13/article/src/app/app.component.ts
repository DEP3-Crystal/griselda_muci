import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Article } from './model/Article';
import { ArticleService } from './services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  articleSubscription = new Subscription();
  articleUpdateSubscription = new Subscription();
  articleList: Article[] = [];
  selectedArticleId: string = '';

  articleExample = {
    title: '',
    tag: '',
    author: '',
    date: '',
    imgUrl: '',
    saying: '',
    content: ''
  }

  articleForm = new FormGroup({
    title: new FormControl(''),
    tag: new FormControl(''),
    author: new FormControl(''),
    date: new FormControl(''),
    imgUrl: new FormControl(''),
    saying: new FormControl(''),
    content: new FormControl(''),
  })
  constructor(
    private articleService: ArticleService
  ) {
  }

  showModal: boolean = false;
  ngOnInit() {

    this.getArticles();

  }
  toogleAddArticle() {
    this.showModal = !this.showModal
    console.log("Modali eshte shfaqur")


  }

  toogleCancelModal() {
    this.showModal = !this.showModal

  }


  editArticles(article: Article) {
    console.log(this.articleForm)
    this.articleForm.controls.title.setValue(article.title);
    this.articleForm.controls.tag.setValue(article.tag);
    this.articleForm.controls.author.setValue(article.author);
    this.articleForm.controls.date.setValue(article.date);
    this.articleForm.controls.imgUrl.setValue(article.imgUrl);
    this.articleForm.controls.saying.setValue(article.saying);
    this.articleForm.controls.content.setValue(article.content);
     this.selectedArticleId=article.id ? article.id:'';
  }
  getArticles() {
    this.articleSubscription = this.articleService.getArticles().subscribe((response) => {
      console.log(response);
      this.articleList = response;
    });
  }
updateArticle(){
  const article:  Article={
    id:  this.selectedArticleId,  
    title:this.articleForm.controls.title.value ?this.articleForm.controls.title.value:'' ,
    tag:this.articleForm.controls.tag.value ?this.articleForm.controls.tag.value:'',
    author:this.articleForm.controls.author.value ?this.articleForm.controls.author.value:'',
    date:this.articleForm.controls.date.value ?this.articleForm.controls.date.value:'',
    imgUrl:this.articleForm.controls.imgUrl.value ?this.articleForm.controls.imgUrl.value:'',
    saying:this.articleForm.controls.saying.value ?this.articleForm.controls.saying.value:'',
    content:this.articleForm.controls.content.value ?this.articleForm.controls.content.value:''

  }
  this.articleUpdateSubscription=this.articleService.updateArticle(article).subscribe(()=>{this.getArticles();})
}



  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
