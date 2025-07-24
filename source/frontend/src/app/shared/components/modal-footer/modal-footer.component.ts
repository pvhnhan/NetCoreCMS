import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomSpinnerComponent } from '../custom-spinner/custom-spinner.component';

@Component({
  selector: 'app-modal-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, CustomSpinnerComponent],
  template: `
    <div class="modal-footer">
      <div class="modal-footer-content">
        <div class="modal-footer-actions">
          <button 
            type="button" 
            class="btn btn-secondary" 
            (click)="onCancel.emit()"
            [disabled]="isSubmitting">
            {{ cancelText }}
          </button>
          <button 
            type="submit" 
            class="btn btn-primary" 
            [disabled]="isDisabled || isSubmitting"
            (click)="onSave.emit()">
            <app-custom-spinner *ngIf="isSubmitting" size="small"></app-custom-spinner>
            {{ isSubmitting ? loadingText : saveText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-footer {
      flex-shrink: 0;
      padding: var(--spacing-lg) var(--spacing-xl);
      border-top: 1px solid rgba(var(--primary-brown-rgb), 0.1);
      background: rgba(var(--primary-brown-rgb), 0.02);
    }
    
    .modal-footer-content {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    
    .modal-footer-actions {
      display: flex;
      gap: var(--spacing-md);
    }
    
    .btn {
      min-width: 110px;
      border-radius: 2rem;
      font-size: 1.08rem;
      font-weight: 600;
      padding: 0.65rem 1.5rem;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
      box-shadow: var(--shadow-xs);
      border: none;
      cursor: pointer;
      
      &.btn-secondary {
        background: #f5f5f5;
        color: var(--gray);
        border: 1px solid #ddd;
        
        &:hover:not(:disabled) {
          background: #ececec;
          color: var(--primary-brown);
        }
        
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
      
      &.btn-primary {
        background: var(--gradient-primary) !important;
        color: #fff !important;
        border: none !important;
        
        &:hover:not(:disabled) {
          background: var(--gradient-primary-reverse) !important;
          color: #fff !important;
          box-shadow: var(--shadow-md) !important;
        }
        
        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  `]
})
export class ModalFooterComponent {
  @Input() isSubmitting: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() saveText: string = 'Lưu';
  @Input() cancelText: string = 'Hủy';
  @Input() loadingText: string = 'Đang lưu...';
  
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
} 