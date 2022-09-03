import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LoginDto, UserDto } from '../dto';
import { ApiService } from './api.service';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo = new BehaviorSubject({});
  jwtHelper = new JwtHelperService();
  access_token = '';
  isLoggedIn = false;
  constructor(private api: ApiService) {
    this.loadUserInfo();
  }

  private loadUserInfo() {
    if (this.userInfo.getValue()) {
      const access_token = this.GetToken();
      if (access_token) {
        this.setUser(access_token);
      }
    }
  }
  isAuthenticated() {
    return this.isLoggedIn;
  }

  GetToken() {
    return localStorage.getItem('access_token');
  }

  RemoveToken() {
    localStorage.removeItem('access_token');
  }

  private setUser(access_token: string) {
    if (!this.jwtHelper.isTokenExpired(access_token)) {
      this.isLoggedIn = true;
      localStorage.setItem('access_token', access_token);
      this.userInfo.next(this.jwtHelper.decodeToken(access_token));
    }
  }

  Login(dto: LoginDto) {
    return this.api
      .post<UserDto>('users/login', dto)
      .pipe(tap((data) => this.setUser(data.user.token)));
  }
  Register(dto: LoginDto) {
    return this.api
      .post<UserDto>('users', dto)
      .pipe(tap((data) => this.setUser(data.user.token)));
  }
}
