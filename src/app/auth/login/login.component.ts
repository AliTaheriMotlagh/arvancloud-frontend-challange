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

  get passwordValidationClass() {
    return (this.form.controls.password.touched ||
      this.form.controls.password.dirty) &&
      this.form.controls.password.hasError('required')
      ? 'is-invalid'
      : '';
  }
  get emailValidationClass() {
    return (this.form.controls.email.touched ||
      this.form.controls.email.dirty) &&
      this.form.controls.email.hasError('required')
      ? 'is-invalid'
      : '' || this.form.controls.email.hasError('email')
      ? 'is-invalid'
      : '';
  }

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
