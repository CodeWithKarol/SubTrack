import { Component, inject } from '@angular/core';
import { AuthApi } from '../auth-api';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authApi = inject(AuthApi);

  login() {
    this.authApi.login();

    console.log(this.authApi.currentUserId());
  }
}
