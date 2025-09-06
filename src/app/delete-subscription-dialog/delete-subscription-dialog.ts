import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-subscription-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './delete-subscription-dialog.html',
  styleUrl: './delete-subscription-dialog.scss',
})
export class DeleteSubscriptionDialog {
  data = inject(MAT_DIALOG_DATA);
}
