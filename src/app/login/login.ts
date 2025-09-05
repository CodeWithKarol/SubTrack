import { Component, inject } from '@angular/core';
import { AuthApi } from '../auth-api';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly authApi = inject(AuthApi);
  private readonly router = inject(Router);
  protected email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  protected password = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  protected loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  async login(): Promise<void> {
    try {
      const user = await this.authApi.login(this.email.value, this.password.value);

      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
}
