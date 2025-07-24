import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastService } from '../../../core/services/toast.service';

import { AuthService, RegisterRequest, User } from '../service';
import { ApiResponse } from '../../../core/services/base-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class RegisterComponent {
  @Output() close = new EventEmitter<void>();
  @Output() openLogin = new EventEmitter<void>();
  
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      phone: [''],
      address: ['']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onClose(): void {
    this.close.emit();
  }

  onOpenLogin(): void {
    this.openLogin.emit();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.hasError('required')) {
      return 'Trường này là bắt buộc';
    }
    if (control?.hasError('minlength')) {
      return `Tối thiểu ${control.errors?.['minlength'].requiredLength} ký tự`;
    }
    if (control?.hasError('email')) {
      return 'Email không hợp lệ';
    }
    if (control?.hasError('passwordMismatch')) {
      return 'Mật khẩu không khớp';
    }
    return '';
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const registerData: RegisterRequest = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        fullName: this.registerForm.get('fullName')?.value,
        phone: this.registerForm.get('phone')?.value || undefined,
        address: this.registerForm.get('address')?.value || undefined
      };

      this.authService.register(registerData).subscribe({
        next: (response: ApiResponse<User>) => {
          if (response.statusCode === 200) {
            this.toastService.success('Đăng ký thành công! Vui lòng đăng nhập.');
            this.router.navigate(['/auth/login']);
          } else {
            this.toastService.error(response.message || 'Đăng ký thất bại!');
          }
        },
        error: (error: any) => {
          console.error('Register error:', error);
          this.toastService.error('Có lỗi xảy ra khi đăng ký!');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getPasswordMismatchError(): boolean {
    return this.registerForm.hasError('passwordMismatch') && 
           (this.registerForm.get('confirmPassword')?.dirty || false);
  }
} 