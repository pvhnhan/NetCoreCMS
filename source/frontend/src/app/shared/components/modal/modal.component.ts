import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CustomSpinnerComponent } from '../custom-spinner/custom-spinner.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    CustomSpinnerComponent
  ]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() subtitle?: string;
  @Input() isSubmitting = false;
  @Input() submitText = 'Lưu';
  @Input() cancelText = 'Hủy';
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
} 