import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApi } from './auth-api';

export const authGuard: CanActivateFn = (route, state) => {
  const authApi = inject(AuthApi);
  const router = inject(Router);

  const isLoggedIn = computed(() => !!authApi.currentUserId());

  if (!isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
