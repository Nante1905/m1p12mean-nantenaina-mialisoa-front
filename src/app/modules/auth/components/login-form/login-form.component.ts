import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ValidationErrorComponent } from '../../../../shared/components/validation-error/validation-error.component';
import { LoginFormDto } from '../../types/LoginFormDto';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    ValidationErrorComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  @Input() loading = false;
  onSubmit = output<LoginFormDto>();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  handleSubmit(): void {
    if (this.loginForm.invalid) return;
    this.onSubmit.emit(this.loginForm.value);
  }
}
