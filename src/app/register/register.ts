import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password?.valid && confirmPassword?.valid && password.value !== confirmPassword.value
      ? { passwordsMismatch: true }
      : null;
  };
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  protected email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  });
  protected password = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(6)],
  });
  protected confirmPassword = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(6)],
  });

  protected registerForm = new FormGroup(
    {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
    { validators: passwordsMatchValidator(), updateOn: 'blur' },
  );

  async onSubmit(): Promise<void> {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email.value,
        this.password.value,
      );
      console.log('User registered:', userCredential);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
}
