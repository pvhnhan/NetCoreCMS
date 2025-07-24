import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dots-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dots-spinner" [ngClass]="size">
      <div class="dots-container">
        <div class="dot" *ngFor="let dot of dots; let i = index" 
             [style.animation-delay]="i * 0.2 + 's'"></div>
      </div>
      <div *ngIf="message" class="dots-message">{{ message }}</div>
    </div>
  `,
  styles: [`
    .dots-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .dots-container {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%);
      animation: bounce 1.4s ease-in-out infinite both;
      box-shadow: 0 2px 8px rgba(139, 69, 19, 0.3);
    }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .dots-message {
      color: #8B4513;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      animation: fadeInOut 2s ease-in-out infinite;
    }

    @keyframes fadeInOut {
      0%, 100% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
    }

    /* Size variants */
    .small .dot {
      width: 8px;
      height: 8px;
    }

    .small .dots-message {
      font-size: 14px;
    }

    .large .dot {
      width: 16px;
      height: 16px;
    }

    .large .dots-message {
      font-size: 18px;
    }
  `]
})
export class DotsSpinnerComponent {
  @Input() message: string = 'Đang tải...';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  dots = [1, 2, 3, 4, 5];
} 