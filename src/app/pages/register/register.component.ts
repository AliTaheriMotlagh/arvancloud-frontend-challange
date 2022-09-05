import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { RegisterDto } from 'src/app/dto';
import { AuthService, NavigationService } from 'src/app/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  form = this.fb.group({
    username: [''],
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

  register() {
    if (this.form.valid) {
      this.isLoading = true;
      const dto: RegisterDto = { user: this.form.getRawValue() };
      this.auth
        .Register(dto)
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

  goToLogin() {
    this.navigation.GoToLogin();
  }
}
