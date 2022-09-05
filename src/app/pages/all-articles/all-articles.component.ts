import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';

import { ArticleDto, PaginationDto } from 'src/app/dto';
import {
  ArticleService,
  NavigationService,
  NotificationService,
} from 'src/app/services';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
})
export class AllArticlesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  articles: ArticleDto[] = [];

  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal,
    private notif: NotificationService,
    private navigate: NavigationService
  ) {}

  ngOnInit(): void {
    this.refreshArticles();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  refreshArticles() {
    const query: PaginationDto = { limit: 20 };
    this.articleService
      .AllArticles(query)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.collectionSize = result.articlesCount;
        this.articles = result.articles
          .map((article, i) => ({
            id: i + 1,
            ...article,
          }))
          .slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          );
        //TODO : Pagination with url and offset
      });
  }

  editHandler(slug: string) {
    return this.navigate.GoToArticle(slug);
  }

  deleteHandler(content: any, slug: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        () => {
          this.deleteArticle(slug);
        },
        () => {}
      );
  }

  private deleteArticle(slug: string) {
    this.articleService
      .DeleteArTicle(slug)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.notif.OpenSuccess('Article deleted successfuly');
        this.articles = this.articles.filter((i) => i.slug !== slug);
      });
  }
}
