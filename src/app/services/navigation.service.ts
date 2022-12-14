import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  GoToRegister() {
    return this.router.navigate(['/', 'register']);
  }
  GoToLogin() {
    return this.router.navigate(['/', 'login']);
  }
  GoToDashboard() {
    return this.router.navigate(['/', 'dashboard']);
  }
  GoToArticleBySlug(slug: string) {
    return this.router.navigate([
      '/',
      'dashboard',
      'articles',
      'edit',
      `${slug}`,
    ]);
  }
  GoToArticleByPage(page: number) {
    if (page == 1) {
      return this.GoToDashboard();
    } else {
      return this.router.navigate([
        '/',
        'dashboard',
        'articles',
        'page',
        `${page}`,
      ]);
    }
  }
}
