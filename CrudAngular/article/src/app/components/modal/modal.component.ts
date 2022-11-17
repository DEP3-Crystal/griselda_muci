import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/model/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input()
  selectedArticle: Article = new Article();
  articleUpdateSubscription = new Subscription();
  articleAddSubscription = new Subscription();
  @Output()
  onCancel = new EventEmitter<boolean>()
  @Output()
  onSaveEditing = new EventEmitter<boolean>()
  @Output()
  onSaveAdding = new EventEmitter<boolean>()


  cancelClicked() {
    this.onCancel.emit(true);
  }
  save() {
    if (this.selectedArticle.id) {
      this.updateArticle();
    } else {
      this.addArticle();
    }
  }

  constructor(private articleService: ArticleService) { }
  articleForm = new FormGroup({
    title: new FormControl(''),
    tag: new FormControl(''),
    author: new FormControl(''),
    date: new FormControl(''),
    imgUrl: new FormControl(''),
    saying: new FormControl(''),
    content: new FormControl(''),
  })

  ngOnInit(): void {

    this.articleForm.controls.title.setValue(this.selectedArticle.title);
    this.articleForm.controls.tag.setValue(this.selectedArticle.tag);
    this.articleForm.controls.author.setValue(this.selectedArticle.author);
    this.articleForm.controls.date.setValue(this.selectedArticle.date);
    this.articleForm.controls.imgUrl.setValue(this.selectedArticle.imgUrl);
    this.articleForm.controls.saying.setValue(this.selectedArticle.saying);
    this.articleForm.controls.content.setValue(this.selectedArticle.content);


  }
  updateArticle() {
    const article: Article = {
      id: this.selectedArticle.id,
      title: this.articleForm.controls.title.value ? this.articleForm.controls.title.value : '',
      tag: this.articleForm.controls.tag.value ? this.articleForm.controls.tag.value : '',
      author: this.articleForm.controls.author.value ? this.articleForm.controls.author.value : '',
      date: this.articleForm.controls.date.value ? this.articleForm.controls.date.value : '',
      imgUrl: this.articleForm.controls.imgUrl.value ? this.articleForm.controls.imgUrl.value : '',
      saying: this.articleForm.controls.saying.value ? this.articleForm.controls.saying.value : '',
      content: this.articleForm.controls.content.value ? this.articleForm.controls.content.value : ''
    }
    this.articleUpdateSubscription = this.articleService.updateArticle(article).subscribe(() => {
      this.onSaveEditing.emit(true);

    })
  }

  addArticle() {
    const article: Article = {
      title: this.articleForm.controls.title.value ? this.articleForm.controls.title.value : '',
      tag: this.articleForm.controls.tag.value ? this.articleForm.controls.tag.value : '',
      author: this.articleForm.controls.author.value ? this.articleForm.controls.author.value : '',
      date: this.articleForm.controls.date.value ? this.articleForm.controls.date.value : '',
      imgUrl: this.articleForm.controls.imgUrl.value ? this.articleForm.controls.imgUrl.value : '',
      saying: this.articleForm.controls.saying.value ? this.articleForm.controls.saying.value : '',
      content: this.articleForm.controls.content.value ? this.articleForm.controls.content.value : ''
    }
    this.articleAddSubscription = this.articleService.addArticle(article).subscribe(() => {
      this.onSaveAdding.emit(true);
    })

  }

}


