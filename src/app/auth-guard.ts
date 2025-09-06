import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const user$ = user(auth);
  const router = inject(Router);

  return user$.pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
  );
};
