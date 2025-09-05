import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((c) => c.Dashboard),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((c) => c.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register').then((c) => c.Register),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
