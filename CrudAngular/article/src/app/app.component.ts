import { Component, OnDestroy, OnInit, Input } from '@angular/core';
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
  articleList: Article[] = [];
  selectedArticleId: string = '';
  selectedArticle: Article = new Article()

constructor(private articleService: ArticleService) {}

  showModal: boolean = false;
  ngOnInit() {

    this.getArticles();
  }

  editArticles(article: Article) {
    this.selectedArticle = article;
    this.showModal = true;
    console.log(this.selectedArticleId);
  }

  getArticles() {
    this.articleSubscription = this.articleService.getArticles().subscribe((response) => {
      console.log(response);
      this.articleList = response;
    });
  }

  afterDone() {
    this.showModal = false;
    this.getArticles()
  }


  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }
}
