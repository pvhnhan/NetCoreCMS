import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="image-upload-field">
      <div class="file-upload-area" 
           (click)="fileInput.click()" 
           (dragover)="onDragOver($event)" 
           (dragleave)="onDragLeave($event)"
           (drop)="onDrop($event)"
           [class.drag-over]="isDragOver">
        <input #fileInput type="file" (change)="onFileSelected($event)" accept="image/*" style="display: none;">
        <mat-icon>cloud_upload</mat-icon>
        <div class="file-upload-label-inline">
          {{ label }} <span class="required-asterisk" *ngIf="required">*</span>
        </div>
        <p>{{ placeholder || 'Kéo thả hoặc click để chọn hình ảnh' }}</p>
        <small>{{ helpText || 'Hỗ trợ: JPG, PNG, GIF (Tối đa 5MB)' }}</small>
      </div>
      <div class="image-preview" *ngIf="imagePreview">
        <img [src]="imagePreview" alt="Preview" class="preview-img">
        <button mat-icon-button color="warn" (click)="removeImage()" type="button" class="remove-btn" aria-label="Xóa ảnh">
          <mat-icon>delete</mat-icon>
        </button>
      </div>
      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .image-upload-field {
      margin-bottom: 0;
    }
    .file-upload-area {
      border: 1.5px dashed #c9a074;
      border-radius: 10px;
      padding: 1.5rem 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      background: #fcf9f6;
      min-width: 220px;
      min-height: 110px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .file-upload-area:hover, .file-upload-area.drag-over {
      border-color: #8B4513;
      background: #f5ede6;
    }
    .file-upload-label-inline {
      font-weight: 600;
      color: #8B4513;
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }
    .required-asterisk {
      color: #d32f2f;
      font-weight: 700;
      font-size: 1.1rem;
    }
    .file-upload-area mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
      color: #8B4513;
      margin-bottom: 0.25rem;
    }
    .file-upload-area p {
      font-size: 1rem;
      color: #222;
      margin: 0 0 0.15rem 0;
      font-weight: 600;
    }
    .file-upload-area small {
      color: #888;
      font-size: 0.92rem;
    }
    .image-preview {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
      padding: 0.25rem 0.5rem;
      background: #fcf9f6;
      border-radius: 8px;
    }
    .preview-img {
      max-width: 60px;
      max-height: 48px;
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.06);
      object-fit: cover;
      border: 1px solid #e0c9b3;
    }
    .remove-btn {
      background: #fbeaea;
      color: #d32f2f;
      width: 28px;
      height: 28px;
      min-width: 28px;
      min-height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.18s;
    }
    .remove-btn:hover {
      background: #d32f2f;
      color: #fff;
    }
    .error-message {
      color: #d32f2f;
      font-size: 0.92rem;
      margin-top: 0.25rem;
    }
  `]
})
export class ImageUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  @Input() imagePreview: string | null = '';
  @Output() fileSelected = new EventEmitter<File>();
  @Output() imageRemoved = new EventEmitter<void>();
  isDragOver = false;
  onDragOver(event: DragEvent) { event.preventDefault(); this.isDragOver = true; }
  onDragLeave(event: DragEvent) { event.preventDefault(); this.isDragOver = false; }
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        this.fileSelected.emit(file);
      }
    }
  }
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      this.fileSelected.emit(file);
    }
  }
  removeImage() {
    this.imageRemoved.emit();
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
} 