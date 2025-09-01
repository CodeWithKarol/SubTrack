import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subscriptions } from '../subscriptions-data';
import { Header } from '../header/header';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, Header, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly subscriptionsData = inject(Subscriptions);
  protected subscriptions = this.subscriptionsData.subscriptions;
  protected totalCost = this.subscriptionsData.totalCost;
}
