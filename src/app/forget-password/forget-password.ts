import { Component, inject } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-forget-password',
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  protected emailControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  protected resetPasswordForm = new FormGroup({
    email: this.emailControl,
  });

  async resetPassword(): Promise<void> {
    if (!this.resetPasswordForm.valid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    try {
      await sendPasswordResetEmail(this.auth, this.emailControl.value);
      console.log('Password reset email sent successfully');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}
