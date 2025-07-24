import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: string;
}

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, MatButtonModule, MatIconModule],
  template: `
    <div class="toast-container" role="alert" aria-live="polite">
      <div class="toast-message" [ngClass]="message.type">
        <mat-icon class="toast-icon">
          {{ getIcon() }}
        </mat-icon>
        <span class="toast-text">{{ message.message }}</span>
        <button 
          *ngIf="message.action"
          mat-icon-button 
          (click)="onAction()"
          aria-label="Thực hiện hành động"
          class="toast-action">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      width: 100%;
      max-width: 400px;
      pointer-events: auto;
      position: relative;
    }
    
    .toast-message {
      display: flex;
      align-items: center;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      margin-bottom: 8px;
      animation: slideIn 0.3s ease-out;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      z-index: 100001;
    }
    
    .toast-message.success {
      background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
      color: white;
    }
    
    .toast-message.error {
      background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
      color: white;
    }
    
    .toast-message.warning {
      background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
      color: white;
    }
    
    .toast-message.info {
      background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
      color: white;
    }
    
    .toast-icon {
      margin-right: 12px;
      font-size: 20px;
    }
    
    .toast-text {
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
      font-weight: 500;
    }
    
    .toast-action {
      margin-left: 8px;
      color: rgba(255,255,255,0.8);
      transition: all 0.2s ease;
    }
    
    .toast-action:hover {
      color: white;
      transform: scale(1.1);
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @media (max-width: 768px) {
      .toast-container {
        max-width: none;
        right: 10px;
        left: 10px;
        top: 90px;
      }
    }
  `]
})
export class ToastNotificationComponent {
  @Input() message: ToastMessage = { message: '', type: 'info' };
  @Output() actionClick = new EventEmitter<void>();
  
  getIcon(): string {
    switch (this.message.type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'info';
    }
  }
  
  onAction(): void {
    this.actionClick.emit();
  }
} 