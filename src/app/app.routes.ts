import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'subscriptions', loadComponent: () => import('./subscription/subscription').then((c) => c.Subscription)},
  { path: 'expenses', loadComponent: () => import('./expense/expense').then((c) => c.Expense)},
  { path: 'reminders', loadComponent: () => import('./reminder/reminder').then((c) => c.Reminder)},
  { path: '', redirectTo: 'subscriptions', pathMatch: 'full' },
  { path: '**', redirectTo: 'subscriptions'}
];
