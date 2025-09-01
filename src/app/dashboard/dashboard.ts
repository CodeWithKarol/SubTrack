import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subscriptions } from '../subscriptions-data';
import { Header } from '../header/header';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from '../subscription.model';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, Header, MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly subscriptionsData = inject(Subscriptions);
  protected subscriptions = this.subscriptionsData.subscriptionsData;
  protected totalCost = this.subscriptionsData.totalCost;

  deleteSubscription(subscriptionId: number): void {
    this.subscriptionsData.removeSubscription(subscriptionId);
  }

  editSubscription(subscriptionId: number): void {
    const updatedSubscription: Subscription = {
      id: subscriptionId,
      name: 'Updated Name',
      category: 'Updated Category',
      cost: 19.99,
      billingDate: '2025-10-01',
      status: 'active',
      logo: '🔄',
      description: 'Updated Description',
    };

    this.subscriptionsData.updateSubscription(updatedSubscription);
  }
}
