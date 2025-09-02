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
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SubscriptionCategory, subscriptionIcons } from '../subscription.model';
import moment, { Moment } from 'moment';
import { MatIconModule } from '@angular/material/icon';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

export const CUSTOM_DATE_FORMATS = {
  parse: { dateInput: 'yyyy-MM-DD' },
  display: {
    dateInput: 'yyyy-MM-DD',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'yyyy-MM-DD',
    monthYearA11yLabel: 'MMM yyyy',
  },
};

@Component({
  selector: 'app-add-subscription-dialog',
  providers: [provideMomentDateAdapter(CUSTOM_DATE_FORMATS)],
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
    MatIconModule,
  ],
  templateUrl: './add-subscription-dialog.html',
  styleUrl: './add-subscription-dialog.scss',
})
export class AddSubscriptionDialog {
  private readonly dialogRef = inject(MatDialogRef<AddSubscriptionDialog>);
  protected subscriptionName = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  protected subscriptionCategory = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  protected subscriptionCost = new FormControl<number>(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(0)],
  });
  protected subscriptionBillingDate = new FormControl<Moment>(
    moment(moment().format('YYYY-MM-DD')).add(1, 'month'),
    {
      nonNullable: true,
      validators: [Validators.required],
    },
  );
  protected subscriptionDescription = new FormControl<string>('', {
    nonNullable: true,
    validators: [],
  });
  protected subscriptionIcon = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  protected form = new FormGroup({
    subscriptionName: this.subscriptionName,
    subscriptionCategory: this.subscriptionCategory,
    subscriptionCost: this.subscriptionCost,
    subscriptionBillingDate: this.subscriptionBillingDate,
    subscriptionDescription: this.subscriptionDescription,
    subscriptionIcon: this.subscriptionIcon,
  });

  protected selectedCategory = signal('');
  protected selectedIcon = signal('');
  protected readonly POPULAR_SUBSCRIPTION_CATEGORIES: SubscriptionCategory[] = [
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

  protected readonly CATEGORY_ICONS = subscriptionIcons;

  submitForm(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const newSubscription = {
      name: this.subscriptionName.value,
      category: this.subscriptionCategory.value,
      cost: this.subscriptionCost.value,
      billingDate: this.subscriptionBillingDate.value.format('YYYY-MM-DD'),
      description: this.subscriptionDescription.value,
      logo: this.subscriptionIcon.value,
      status: 'active',
    };

    this.dialogRef.close(newSubscription);
  }
}
