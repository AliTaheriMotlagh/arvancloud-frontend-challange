import { Injectable } from '@angular/core';
import { AllArticlesDto } from '../dto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private api: ApiService) {}

  AllArticles() {
    return this.api.get<AllArticlesDto>('articles');
  }

  DeleteArTicle(slug: string) {
    return this.api.delete(`articles/${slug}`);
  }
}
