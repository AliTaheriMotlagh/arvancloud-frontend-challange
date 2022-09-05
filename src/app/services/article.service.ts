import { Injectable } from '@angular/core';
import {
  AllArticlesDto,
  AllTagsDto,
  ArticleBySlugDto,
  ArticleDto,
  CreateArticleDto,
  PaginationDto,
} from '../dto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private api: ApiService) {}

  ArticleBySlug(slug: string) {
    return this.api.get<ArticleBySlugDto>(`articles/${slug}`);
  }

  AllArticles(query: PaginationDto) {
    return this.api.get<AllArticlesDto>('articles', query);
  }

  CreateArticles(dto: CreateArticleDto) {
    return this.api.post<CreateArticleDto>('articles', dto);
  }

  UpdateArticles(dto: CreateArticleDto) {
    return this.api.put<CreateArticleDto>(`articles/${dto.article.slug}`, dto);
  }

  DeleteArTicle(slug: string) {
    return this.api.delete(`articles/${slug}`);
  }

  AllTags() {
    return this.api.get<AllTagsDto>('tags');
  }
}
