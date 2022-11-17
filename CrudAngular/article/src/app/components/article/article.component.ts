import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/model/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  displayContent: boolean = false;
  @Input()
  article: Article = new Article();

  @Output()
  getArticlesEvent = new EventEmitter<string>();

  @Output()
  editArticlesEvent = new EventEmitter<Article>();

  @Output()
  onEditClick = new EventEmitter<boolean>()

  editClick() {
    this.onEditClick.emit(true);
  }


  articleDeleteSubscription = new Subscription();
  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.articleDeleteSubscription) {
      this.articleDeleteSubscription.unsubscribe();
    }
  }
  readMore() {
    this.displayContent = !this.displayContent
  }


  triggerEditArticle() {
    this.editArticlesEvent.emit(this.article);
  }

  triggerGetArticles() {
    this.getArticlesEvent.emit('');
  }

  deleteArticle() {
    this.articleDeleteSubscription = this.articleService.deleteArticle(this.article.id ? this.article.id : '').subscribe(() => {
      this.triggerGetArticles();
    })
  }


}
