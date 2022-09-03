import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService, NavigationService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  username = '';
  constructor(
    public auth: AuthService,
    private navigation: NavigationService
  ) {}

  ngOnInit(): void {
    this.auth.userInfo$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result: any) => {
        this.username = result.username;
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  logout() {
    this.auth.Logout();
    this.navigation.GoToLogin();
  }
}
