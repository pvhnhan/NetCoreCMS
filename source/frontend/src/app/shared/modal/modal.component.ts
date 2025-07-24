import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div *ngIf="show" class="modal-overlay" (mousedown)="onOverlayMouseDown($event)">
      <div class="modal-dialog" (mousedown)="$event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">
            <ng-content select="[modal-header-icon]"></ng-content>
            {{ headerTitle }}
          </h2>
          <button class="modal-close" (click)="close.emit()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
        <div class="modal-body">
          <ng-content select="[modal-body]"></ng-content>
        </div>
        <div class="modal-footer">
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() show = false;
  @Input() headerTitle = '';
  @Output() close = new EventEmitter<void>();

  onOverlayMouseDown(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }
} 