import { Component, inject, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthApi } from '../auth-api';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, CurrencyPipe, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly authApi = inject(AuthApi);
  currentUserId = this.authApi.currentUserId;
  totalCost = input.required<number>();

  login() {
    this.authApi.login();
  }

  logout() {
    this.authApi.logout();
  }
}
