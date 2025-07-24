import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-add-button',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <button mat-icon-button
            class="icon-add-btn"
            [attr.aria-label]="ariaLabel || 'Thêm'"
            [disabled]="disabled"
            (click)="click.emit($event)">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: [`
    .icon-add-btn {
      background: linear-gradient(135deg, #8B4513 0%, #C19A6B 100%);
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      min-width: 44px;
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      font-size: 1.5rem;
      transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
    }
    .icon-add-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, #C19A6B 0%, #8B4513 100%);
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      transform: scale(1.08);
    }
    .icon-add-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .icon-add-btn mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      margin: 0;
      color: #fff;
    }
  `]
})
export class IconAddButtonComponent {
  @Input() disabled = false;
  @Input() ariaLabel = 'Thêm';
  @Output() click = new EventEmitter<Event>();
} 