import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((c) => c.Dashboard),
  },
  {
    path: 'analytics',
    loadComponent: () => import('./analytics/analytics').then((c) => c.Analytics),
  },
  {
    path: 'reminders',
    loadComponent: () => import('./reminders/reminders').then((c) => c.Reminders),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
