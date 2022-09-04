import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ArticleDto } from 'src/app/dto';
import { ArticleService, NotificationService } from 'src/app/services';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
})
export class AllArticlesComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  articles: ArticleDto[] = [];

  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal,
    private notif: NotificationService
  ) {}

  ngOnInit(): void {
    this.refreshArticles();
  }

  refreshArticles() {
    this.articleService.AllArticles().subscribe((result) => {
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
    });
  }

  deleteHandler(content: any, slug: string) {
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
    this.articleService.DeleteArTicle(slug).subscribe((result) => {
      this.notif.OpenSuccess('Article deleted successfuly');
      this.articles = this.articles.filter((i) => i.slug !== slug);
    });
  }
}
