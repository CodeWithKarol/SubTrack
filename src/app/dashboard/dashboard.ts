import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subscriptions } from '../subscriptions-data';
import { Header } from '../header/header';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from '../subscription.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteSubscriptionDialog } from '../delete-subscription-dialog/delete-subscription-dialog';
import { filter, take, tap } from 'rxjs';
import { EditSubscriptionDialog } from '../edit-subscription-dialog/edit-subscription-dialog';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, Header, MatButtonModule, MatDialogModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly subscriptionsData = inject(Subscriptions);
  private readonly dialog = inject(MatDialog);
  protected subscriptions = this.subscriptionsData.subscriptionsData;
  protected totalCost = this.subscriptionsData.totalCost;

  deleteSubscription(subscriptionId: number): void {
    const subscription = this.subscriptions().find((sub) => sub.id === subscriptionId);

    if (!subscription) {
      return;
    }

    this.dialog
      .open(DeleteSubscriptionDialog, {
        data: { name: subscription.name },
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((result: boolean) => Boolean(result)),
        tap(() => this.subscriptionsData.removeSubscription(subscriptionId)),
      )
      .subscribe();
  }

  editSubscription(subscriptionId: number): void {
    const subscription = this.subscriptions().find((sub) => sub.id === subscriptionId);

    if (!subscription) {
      return;
    }

    this.dialog
      .open(EditSubscriptionDialog, { data: { subscription } })
      .afterClosed()
      .pipe(
        take(1),
        filter((result: Subscription) => Boolean(result)),
        tap((updatedSubscription: Subscription) =>
          this.subscriptionsData.updateSubscription(updatedSubscription),
        ),
      )
      .subscribe();
  }
}
