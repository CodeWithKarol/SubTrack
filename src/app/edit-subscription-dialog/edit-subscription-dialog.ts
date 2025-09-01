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
  selector: 'app-edit-subscription-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './edit-subscription-dialog.html',
  styleUrl: './edit-subscription-dialog.scss',
})
export class EditSubscriptionDialog {
  data = inject(MAT_DIALOG_DATA);
}
