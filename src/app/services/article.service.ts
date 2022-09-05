import { Injectable } from '@angular/core';
import { AllArticlesDto, AllTagsDto, PaginationDto } from '../dto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private api: ApiService) {}

  AllArticles(query: PaginationDto) {
    return this.api.get<AllArticlesDto>('articles', query);
  }

  DeleteArTicle(slug: string) {
    return this.api.delete(`articles/${slug}`);
  }

  AllTags() {
    return this.api.get<AllTagsDto>('tags');
  }
}
