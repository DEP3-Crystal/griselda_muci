import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
