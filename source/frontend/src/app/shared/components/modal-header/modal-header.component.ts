import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="modal-header">
      <div class="modal-header-content">
        <div class="modal-header-text">
          <h2>{{ title }}</h2>
          <p *ngIf="subtitle">{{ subtitle }}</p>
        </div>
        <button class="modal-close-btn" (click)="onClose.emit()" aria-label="Đóng">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .modal-header {
      background: linear-gradient(90deg, #8B4513 0%, #C19A6B 100%);
      margin: 0 0 var(--spacing-md) 0;
      padding: var(--spacing-lg) var(--spacing-xl);
      border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
    }
    
    .modal-header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--spacing-md);
    }
    
    .modal-header-text {
      flex: 1;
      
      h2 {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--white);
        margin-bottom: var(--spacing-xs);
        margin: 0;
      }
      
      p {
        font-size: var(--font-size-lg);
        color: rgba(255, 255, 255, 0.9);
        margin: var(--spacing-xs) 0 0 0;
      }
    }
    
    .modal-close-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.2);
      color: var(--white);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-normal);
      flex-shrink: 0;
      
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        color: var(--white);
        transform: scale(1.1);
      }
      
      mat-icon {
        font-size: var(--font-size-lg);
        width: var(--font-size-lg);
        height: var(--font-size-lg);
      }
    }
  `]
})
export class ModalHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  
  @Output() onClose = new EventEmitter<void>();
} 