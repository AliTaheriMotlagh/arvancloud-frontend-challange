import { Component, OnInit } from '@angular/core';
import { AllArticlesDto, ArticleDto } from 'src/app/dto';
import { ArticleService } from 'src/app/services';

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

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.refreshCountries();
  }

  refreshCountries() {
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
}
