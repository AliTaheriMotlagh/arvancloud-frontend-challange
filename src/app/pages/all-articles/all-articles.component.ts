import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  datasource: ArticleDto[] = [];

  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal,
    private notif: NotificationService,
    private navigate: NavigationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadArticles() {
    const query: PaginationDto = { limit: 100 };
    this.articleService
      .AllArticles(query)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
        this.collectionSize = result.articlesCount;
        this.articles = result.articles;
        this.page = +this.route.snapshot.params['page'] || 1;
        this.refreshPagination();
      });
  }

  refreshPagination() {
    this.datasource = this.articles
      .map((article, i) => ({
        id: i + 1,
        ...article,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );

    this.navigate.GoToArticleByPage(this.page);
    // TODO : page 1 = /articles and 2 api call
  }

  goToPage(page: number) {}

  editHandler(slug: string) {
    return this.navigate.GoToArticleBySlug(slug);
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
