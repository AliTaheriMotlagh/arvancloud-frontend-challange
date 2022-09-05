import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CreateArticleDto } from 'src/app/dto';
import {
  ArticleService,
  NavigationService,
  NotificationService,
} from 'src/app/services';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  form = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    body: [''],
    tagList: [['']],
  });

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private notif: NotificationService,
    private navigate: NavigationService
  ) {}

  ngOnInit(): void {}
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  save() {
    const dto: CreateArticleDto = { article: this.form.getRawValue() };
    this.articleService
      .CreateArticles(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.notif.OpenSuccess('Article created successfuly', 'Well Done!');
        this.navigate.GoToDashboard();
      });
  }

  tagListUpdate(result: string[]) {
    this.form.controls.tagList.patchValue(result);
  }
}
