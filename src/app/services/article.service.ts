import { Injectable } from '@angular/core';
import { AllArticlesDto, AllTagsDto, ArticleDto, CreateArticleDto, PaginationDto } from '../dto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private api: ApiService) {}

  AllArticles(query: PaginationDto) {
    return this.api.get<AllArticlesDto>('articles', query);
  }

  CreateArticles(dto: CreateArticleDto) {
    return this.api.post<CreateArticleDto>('articles', dto);
  }

  DeleteArTicle(slug: string) {
    return this.api.delete(`articles/${slug}`);
  }

  AllTags() {
    return this.api.get<AllTagsDto>('tags');
  }
}
