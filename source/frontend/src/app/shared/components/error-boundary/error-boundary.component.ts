import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

export interface ErrorInfo {
  message: string;
  code?: string;
  details?: any;
}

@Component({
  selector: 'app-error-boundary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <mat-card class="error-card" *ngIf="error">
      <mat-card-content>
        <div class="error-icon">
          <mat-icon>error_outline</mat-icon>
        </div>
        <h3 class="error-title">{{ error.message || 'Đã xảy ra lỗi' }}</h3>
        <p class="error-description">
          {{ getErrorMessage() }}
        </p>
        <div class="error-actions">
          <button mat-raised-button color="primary" (click)="retry()">
            <mat-icon>refresh</mat-icon>
            Thử lại
          </button>
          <button mat-stroked-button (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Quay lại
          </button>
        </div>
        <div class="error-details" *ngIf="showDetails">
          <pre>{{ error.details | json }}</pre>
        </div>
        <button mat-button (click)="toggleDetails()" class="details-toggle">
          {{ showDetails ? 'Ẩn' : 'Hiển thị' }} chi tiết lỗi
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .error-card {
      max-width: 500px;
      margin: 40px auto;
      text-align: center;
      border-radius: 12px;
    }
    
    .error-icon {
      font-size: 64px;
      color: #f44336;
      margin-bottom: 16px;
    }
    
    .error-title {
      color: #d32f2f;
      margin-bottom: 12px;
      font-size: 1.5rem;
    }
    
    .error-description {
      color: #666;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    
    .error-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin-bottom: 16px;
    }
    
    .error-details {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 16px;
      margin-top: 16px;
      text-align: left;
      font-family: monospace;
      font-size: 12px;
      overflow-x: auto;
    }
    
    .details-toggle {
      font-size: 12px;
      color: #666;
    }
  `]
})
export class ErrorBoundaryComponent {
  @Input() error: ErrorInfo | null = null;
  @Output() retryEvent = new EventEmitter<void>();
  @Output() goBackEvent = new EventEmitter<void>();
  
  showDetails = false;
  
  getErrorMessage(): string {
    if (!this.error) return 'Đã xảy ra lỗi không xác định';
    
    switch (this.error.code) {
      case 'NETWORK_ERROR':
        return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.';
      case 'AUTH_ERROR':
        return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
      case 'PERMISSION_ERROR':
        return 'Bạn không có quyền truy cập tài nguyên này.';
      case 'VALIDATION_ERROR':
        return 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin.';
      default:
        return 'Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại sau.';
    }
  }
  
  retry(): void {
    this.retryEvent.emit();
  }
  
  goBack(): void {
    this.goBackEvent.emit();
  }
  
  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
} 