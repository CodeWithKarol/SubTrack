import { Component, inject } from '@angular/core';
import { AuthApi } from '../auth-api';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authApi = inject(AuthApi);
  private readonly router = inject(Router);

  login() {
    this.authApi.login();
  }
}
