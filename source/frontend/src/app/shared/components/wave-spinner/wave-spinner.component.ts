import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wave-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wave-spinner" [ngClass]="size">
      <div class="wave-container">
        <div class="wave" *ngFor="let wave of waves; let i = index" 
             [style.animation-delay]="i * 0.1 + 's'"></div>
      </div>
      <div *ngIf="message" class="wave-message">{{ message }}</div>
    </div>
  `,
  styles: [`
    .wave-spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .wave-container {
      display: flex;
      gap: 4px;
      align-items: center;
      height: 40px;
    }

    .wave {
      width: 4px;
      height: 100%;
      background: linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #FFD700 100%);
      border-radius: 2px;
      animation: wave 1.2s ease-in-out infinite;
      box-shadow: 0 2px 8px rgba(139, 69, 19, 0.3);
    }

    @keyframes wave {
      0%, 40%, 100% {
        transform: scaleY(0.4);
        opacity: 0.5;
      }
      20% {
        transform: scaleY(1);
        opacity: 1;
      }
    }

    .wave-message {
      color: #8B4513;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      animation: waveFade 2s ease-in-out infinite;
    }

    @keyframes waveFade {
      0%, 100% {
        opacity: 0.7;
      }
      50% {
        opacity: 1;
      }
    }

    /* Size variants */
    .small .wave-container {
      height: 30px;
    }

    .small .wave {
      width: 3px;
    }

    .small .wave-message {
      font-size: 14px;
    }

    .large .wave-container {
      height: 50px;
    }

    .large .wave {
      width: 5px;
    }

    .large .wave-message {
      font-size: 18px;
    }
  `]
})
export class WaveSpinnerComponent {
  @Input() message: string = 'Đang tải...';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  waves = [1, 2, 3, 4, 5, 6, 7, 8];
} 