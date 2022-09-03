import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { NotificationService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notif: NotificationService) {}

  getEerorMessage(errors: any): string {
    return `${Object.keys(errors)[0]} ${errors[Object.keys(errors)[0]]}`;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        debugger
        this.notif.OpenError(this.getEerorMessage(error.error.errors),'Login Faild!');
        return throwError(() => error);
      })
    );
  }
}
