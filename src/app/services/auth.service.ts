import { Injectable } from '@angular/core';
import { LoginDto } from '../dto';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}
  Login(dto: LoginDto) {
   return this.api.post('users/login', dto);
  }
}
