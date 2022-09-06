import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles/all-articles.component';
import { ArticleComponent } from './article/article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppCommonModule } from '../common/common.module';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [AllArticlesComponent, ArticleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    AppCommonModule,
    ShareModule,
  ],
})
export class ArticleModule {}
