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
    username: ['', Validators.required],
    email: ['', [Validators.email]],
    password: ['', Validators.required],
  });

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
      const dto: RegisterDto = { user: this.form.getRawValue() };
      this.auth
        .Register(dto)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((result) => {
          this.navigation.GoToDashboard();
        });
    }
  }

  goToLogin() {
    this.navigation.GoToLogin();
  }
}
