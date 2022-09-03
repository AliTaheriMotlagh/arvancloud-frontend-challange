import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, NavigationService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private navigation: NavigationService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const toUrl = state.url;
    if (this.auth.isAuthenticated()) {
      if (toUrl.indexOf('/register') === 0 || toUrl.indexOf('/login') === 0) {
        return this.navigation.GoToDashboard();
      }
      return true;
    } else {
      if (toUrl.indexOf('/register') === 0 || toUrl.indexOf('/login') === 0) {
        return true;
      }
    }

    return this.navigation.GoToLogin();
  }
}
