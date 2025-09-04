import { inject, Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  currentUserId = signal<string | null>(null);

  async logout(): Promise<void> {
    await this.auth.signOut();

    this.currentUserId.set(null);

    this.router.navigate(['/login']);
  }

  async login(): Promise<void> {
    const user = await signInWithEmailAndPassword(this.auth, 'kmodelski93@gmail.com', 'test123');

    this.currentUserId.set(user.user.uid);

    this.router.navigate(['/dashboard']);
  }
}
