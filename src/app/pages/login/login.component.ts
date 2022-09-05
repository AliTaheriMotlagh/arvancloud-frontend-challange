import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { LoginDto } from 'src/app/dto';
import { AuthService, NavigationService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  form = this.fb.group({
    email: ['', [Validators.email]],
    password: ['', Validators.required],
  });

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private navigation: NavigationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  login() {
    if (this.form.valid) {
      this.isLoading = true;
      const dto: LoginDto = { user: this.form.getRawValue() };
      this.auth
        .Login(dto)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (result) => {
            this.isLoading = false;
            this.navigation.GoToDashboard();
          },
          () => {
            this.isLoading = false;
          }
        );
    }
  }

  goToRegister() {
    this.navigation.GoToRegister();
  }
}
