import { inject, Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  user,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private user$ = user(this.auth);
  $user = toSignal(this.user$, { initialValue: null });

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  async login(username: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, username, password);
  }
}
