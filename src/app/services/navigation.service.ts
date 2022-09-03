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
}
