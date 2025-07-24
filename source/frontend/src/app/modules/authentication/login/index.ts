import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { ToastService } from '../../../core/services/toast.service';
import { LoadingService } from '../../../core/services/loading.service';
import { AuthService, LoginRequest } from '../service';
import { ApiResponse } from '../../../core/services/base-api.service';

@Component({
  selector: 'app-login-overlay',
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
    MatProgressSpinnerModule,
    MatExpansionModule
  ],
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class LoginOverlayComponent {
  @Output() close = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>(); // Thêm event khi đăng nhập thành công
  
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loadingService.showSpinner('Đang đăng nhập...', 'custom', 'medium');
      
      const loginData: LoginRequest = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.authService.login(loginData).subscribe({
        next: (response: ApiResponse<any>) => {
          this.isLoading = false;
          this.loadingService.hide();
          
          console.log('Login response:', response); // Debug log
          
          // Kiểm tra cả statusCode và data
          if (response.statusCode === 200 && response.data && response.data.token) {
            this.toastService.success('Đăng nhập thành công!');
            this.loginSuccess.emit(); // Emit event thành công
            this.close.emit();
          } else {
            // Nếu không thành công, chỉ hiển thị lỗi và giữ modal
            const errorMessage = response.message || 'Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.';
            this.toastService.error(errorMessage);
            // KHÔNG gọi this.close.emit() để giữ modal mở
            // Reset password field để người dùng có thể thử lại
            this.loginForm.get('password')?.reset();
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          this.loadingService.hide();
          console.error('Login error:', error);
          
          // Xử lý các loại lỗi khác nhau
          let errorMessage = 'Có lỗi xảy ra khi đăng nhập! Vui lòng thử lại.';
          
          if (error.status === 401) {
            errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng!';
          } else if (error.status === 400) {
            errorMessage = 'Thông tin đăng nhập không hợp lệ!';
          } else if (error.status === 0) {
            errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.';
          } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          
          this.toastService.error(errorMessage);
          // KHÔNG gọi this.close.emit() để giữ modal mở
          // Reset password field để người dùng có thể thử lại
          this.loginForm.get('password')?.reset();
        }
      });
    } else {
      this.toastService.error('Vui lòng kiểm tra lại thông tin đăng nhập!');
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onOpenRegister(): void {
    this.openRegister.emit();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) {
      return 'Trường này là bắt buộc';
    }
    if (control?.hasError('minlength')) {
      return `Tối thiểu ${control.errors?.['minlength'].requiredLength} ký tự`;
    }
    return '';
  }

  fillDemoAccount(username: string, password: string): void {
    this.loginForm.patchValue({
      username: username,
      password: password
    });
    
    this.toastService.success(`Đã điền thông tin tài khoản ${username}!`);
  }

  // Method test để kiểm tra toast và login success
  testLoginSuccess(): void {
    console.log('Testing login success...');
    this.toastService.success('Test: Đăng nhập thành công!');
    this.loginSuccess.emit();
    this.close.emit();
  }
} 