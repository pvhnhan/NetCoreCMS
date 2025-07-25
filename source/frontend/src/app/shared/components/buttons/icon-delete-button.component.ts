import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-delete-button',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <button mat-icon-button
            class="icon-delete-btn"
            [attr.aria-label]="ariaLabel || 'Xóa'"
            [disabled]="disabled"
            (click)="click.emit($event)">
      <mat-icon>delete</mat-icon>
    </button>
  `,
  styles: [`
    .icon-delete-btn {
      background: linear-gradient(135deg, #E53935 0%, #B71C1C 100%);
      color: #fff;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      min-width: 36px;
      min-height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      font-size: 1.3rem;
      transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
    }
    .icon-delete-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, #B71C1C 0%, #E53935 100%);
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      transform: scale(1.12);
    }
    .icon-delete-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .icon-delete-btn mat-icon {
      font-size: 1.3rem;
      width: 1.3rem;
      height: 1.3rem;
      margin: 0;
      color: #fff;
    }
  `]
})
export class IconDeleteButtonComponent {
  @Input() disabled = false;
  @Input() ariaLabel = 'Xóa';
  @Output() click = new EventEmitter<Event>();
} 