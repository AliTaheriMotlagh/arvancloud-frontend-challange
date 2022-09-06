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

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.errors) {
          for (const key in error.error.errors) {
            if (Object.prototype.hasOwnProperty.call(error.error.errors, key)) {
              const element = error.error.errors[key];
              this.notif.OpenError(`${key} ${element}`);
            }
          }
        }

        if (error.error.message) {
          this.notif.OpenError(error.error.message, error.error.status);
        }

        return throwError(() => error);
      })
    );
  }
}
