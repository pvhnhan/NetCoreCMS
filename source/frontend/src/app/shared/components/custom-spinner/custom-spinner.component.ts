import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="custom-spinner" [ngClass]="size">
      <div class="spinner-container">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <div *ngIf="message" class="spinner-message">{{ message }}</div>
    </div>
  `,
  styles: [`
    .custom-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .spinner-container {
      position: relative;
      width: 60px;
      height: 60px;
    }

    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top: 3px solid #8B4513;
      border-radius: 50%;
      animation: spin 1.2s linear infinite;
    }

    .spinner-ring:nth-child(1) {
      animation-delay: 0s;
      border-top-color: #8B4513;
    }

    .spinner-ring:nth-child(2) {
      animation-delay: 0.3s;
      border-top-color: #D2691E;
    }

    .spinner-ring:nth-child(3) {
      animation-delay: 0.6s;
      border-top-color: #FFD700;
    }

    .spinner-ring:nth-child(4) {
      animation-delay: 0.9s;
      border-top-color: #FFA500;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .spinner-message {
      color: #8B4513;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      margin-top: 8px;
    }

    /* Size variants */
    .small .spinner-container {
      width: 30px;
      height: 30px;
    }

    .small .spinner-ring {
      border-width: 2px;
    }

    .small .spinner-message {
      font-size: 14px;
    }

    .large .spinner-container {
      width: 80px;
      height: 80px;
    }

    .large .spinner-ring {
      border-width: 4px;
    }

    .large .spinner-message {
      font-size: 18px;
    }

    /* Pulse animation for message */
    .spinner-message {
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }
  `]
})
export class CustomSpinnerComponent {
  @Input() message: string = 'Đang tải...';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
} 