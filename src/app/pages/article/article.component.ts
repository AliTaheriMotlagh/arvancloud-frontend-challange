import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ArticleDto, CreateArticleDto } from 'src/app/dto';
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

  isEdit = false;
  slug: string = '';
  data: ArticleDto | null = null;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private notif: NotificationService,
    private navigate: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug')!;
      if (this.slug) {
        this.isEdit = true;
        this.getArticleData();
      }
    });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getArticleData() {
    this.articleService.ArticleBySlug(this.slug).subscribe((result) => {
      this.data = result.article;
      this.form.patchValue(result.article);
    });
  }

  save() {
    if (this.form.valid) {
      this.isLoading = true;
      const dto: CreateArticleDto = {
        article: {
          body: this.form.getRawValue().body!,
          description: this.form.getRawValue().description!,
          title: this.form.getRawValue().title!,
          tagList: this.form.getRawValue().tagList!,
          slug: this.slug,
        },
      };

      if (this.isEdit) {
        this.updateArticle(dto);
      } else {
        this.createArticle(dto);
      }
    }
  }

  createArticle(dto: CreateArticleDto) {
    this.articleService
      .CreateArticles(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (result) => {
          this.isLoading = false;
          this.notif.OpenSuccess('Article created successfuly', 'Well Done!');
          this.navigate.GoToDashboard();
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  updateArticle(dto: CreateArticleDto) {
    this.articleService
      .UpdateArticles(dto)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (result) => {
          this.isLoading = false;
          this.notif.OpenSuccess('Article update successfuly', 'Well Done!');
          this.navigate.GoToDashboard();
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  tagListUpdate(result: string[]) {
    this.form.controls.tagList.patchValue(result);
  }
}
