import { Component, inject, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FirestoreApi } from '../firestore-api';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, CurrencyPipe, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly firestoreApi = inject(FirestoreApi);
  currentUserId = this.firestoreApi.currentUserId;
  totalCost = input.required<number>();

  login() {
    this.firestoreApi.login();
  }

  logout() {
    this.firestoreApi.logout();
  }
}
