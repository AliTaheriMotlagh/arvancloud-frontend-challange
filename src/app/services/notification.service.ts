import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  OpenError(message: string, title: string) {
    this.toastr.error(`${title} ${message}`, '', {
      closeButton: true,
      positionClass: 'toast-top-right',
      tapToDismiss: false,
    });
  }
}
