import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  post<T>(endpoint: string, body?: any) {
    return this.http.post<T>(`${environment.apiUrl}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body?: any) {
    return this.http.put<T>(`${environment.apiUrl}/${endpoint}`, body);
  }

  get<T>(endpoint: string, params?: any) {
    return this.http.get<T>(`${environment.apiUrl}/${endpoint}`, { params });
  }

  delete<T>(endpoint: string, params?: any) {
    return this.http.delete<T>(`${environment.apiUrl}/${endpoint}`, { params });
  }
}
