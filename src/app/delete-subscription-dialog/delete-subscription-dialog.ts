import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from '../subscription.model';

@Component({
  selector: 'app-delete-subscription-dialog',
  imports: [],
  templateUrl: './delete-subscription-dialog.html',
  styleUrl: './delete-subscription-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteSubscriptionDialog {
  data = inject(MAT_DIALOG_DATA);
}
