import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginDto } from 'src/app/dto';
import { AuthService, NavigationService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private navigation: NavigationService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}
  login() {
    if (this.loginForm.valid) {
      const dto: LoginDto = { user: this.loginForm.getRawValue() };
      this.auth.Login(dto).subscribe((result) => {
        debugger;
      });
    }
  }
  goToRegister() {
    this.navigation.GoToRegisterPage();
  }
}
