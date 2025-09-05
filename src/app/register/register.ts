import { Component } from '@angular/core';
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
  protected email = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  protected password = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  protected confirmPassword = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  protected registerForm = new FormGroup(
    {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
    { validators: passwordsMatchValidator(), updateOn: 'blur' },
  );

  onSubmit(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log('Form Submitted', this.registerForm.value);
  }
}
