import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-edit-subscription-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './edit-subscription-dialog.html',
  styleUrl: './edit-subscription-dialog.scss',
})
export class EditSubscriptionDialog {
  private readonly data = inject(MAT_DIALOG_DATA);
  protected subscriptionName = new FormControl<string>(this.data.subscription.name, {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  protected subscriptionCategory = new FormControl<string>(this.data.subscription.category, {
    nonNullable: true,
    validators: [Validators.required],
  });
  protected subscriptionCost = new FormControl<number>(this.data.subscription.cost, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(0)],
  });
  protected subscriptionBillingDate = new FormControl<string>(this.data.subscription.billingDate, {
    nonNullable: true,
    validators: [Validators.required],
  });
  protected subscriptionDescription = new FormControl<string>(this.data.subscription.description, {
    nonNullable: true,
    validators: [],
  });
  protected subscriptionIcon = new FormControl<string>(this.data.subscription.logo, {
    nonNullable: true,
    validators: [],
  });

  protected form = new FormGroup({
    subscriptionName: this.subscriptionName,
    subscriptionCategory: this.subscriptionCategory,
    subscriptionCost: this.subscriptionCost,
    subscriptionBillingDate: this.subscriptionBillingDate,
    subscriptionDescription: this.subscriptionDescription,
    subscriptionIcon: this.subscriptionIcon,
  });

  protected selectedCategory = signal(this.data.subscription.category);
  protected readonly POPULAR_SUBSCRIPTION_CATEGORIES = [
    'Streaming Video',
    'Streaming Music',
    'Gaming',
    'Cloud Storage',
    'Productivity',
    'News & Magazines',
    'Food & Meal Kits',
    'Health & Fitness',
    'Software',
    'Shopping',
    'Education',
    'Finance',
    'Utilities',
    'Transportation',
    'Books & Audiobooks',
  ];

  submitForm(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const updatedSubscription = {
      ...this.data.subscription,
      name: this.subscriptionName.value,
      category: this.subscriptionCategory.value,
      cost: this.subscriptionCost.value,
      billingDate: this.subscriptionBillingDate.value,
      description: this.subscriptionDescription.value,
      logo: this.subscriptionIcon.value,
    };

    console.log('Updated Subscription:', updatedSubscription);
  }
}
