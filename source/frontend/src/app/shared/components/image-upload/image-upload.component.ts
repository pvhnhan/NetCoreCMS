import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="image-upload-container">
      <label class="upload-label" *ngIf="label">
        {{ label }} <span class="required-asterisk" *ngIf="required">*</span>
      </label>
      
      <div class="upload-area"
           [class.drag-over]="isDragOver"
           (click)="fileInput.click()"
           (dragover)="onDragOver($event)"
           (dragleave)="onDragLeave($event)"
           (drop)="onDrop($event)">
        
        <input #fileInput 
               type="file" 
               (change)="onFileSelected($event)" 
               accept="image/*" 
               style="display: none;">
        
        <div class="upload-content" *ngIf="!getPreviewUrl()">
          <mat-icon class="upload-icon">cloud_upload</mat-icon>
          <p class="upload-text">{{ placeholder || 'Kéo thả hoặc click để chọn hình ảnh' }}</p>
          <small class="upload-hint">{{ hint || 'Hỗ trợ: JPG, PNG, GIF (Tối đa 5MB)' }}</small>
        </div>
        
        <div class="image-preview" *ngIf="getPreviewUrl()">
          <img [src]="getPreviewUrl()" [alt]="fileName" class="preview-image">
          <div class="preview-overlay">
            <button mat-icon-button color="warn" (click)="removeImage()" class="remove-btn" aria-label="Xóa ảnh">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </div>
      
      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styleUrls: ['./image-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    }
  ]
})
export class ImageUploadComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() hint: string = '';
  @Input() required: boolean = false;
  @Input() maxSize: number = 5; // MB
  @Input() acceptedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'];
  @Input() imagePreview: string | null = null; // For external preview URL
  
  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileRemoved = new EventEmitter<void>();
  @Output() imageRemoved = new EventEmitter<void>(); // For backward compatibility
  @Output() error = new EventEmitter<string>();

  internalPreview: string | ArrayBuffer | null = null;
  fileName: string = '';
  isDragOver = false;
  errorMessage: string = '';
  
  private onChange = (value: any) => {};
  private onTouched = () => {};

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  private processFile(file: File): void {
    this.errorMessage = '';
    
    // Validate file type
    if (!this.acceptedTypes.includes(file.type)) {
      this.errorMessage = 'Loại file không được hỗ trợ';
      this.error.emit(this.errorMessage);
      return;
    }
    
    // Validate file size
    if (file.size > this.maxSize * 1024 * 1024) {
      this.errorMessage = `File quá lớn. Tối đa ${this.maxSize}MB`;
      this.error.emit(this.errorMessage);
      return;
    }
    
    // Process file
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.internalPreview = e.target?.result || null;
      this.onChange(file);
      this.onTouched();
      this.fileSelected.emit(file);
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.internalPreview = null;
    this.fileName = '';
    this.onChange(null);
    this.onTouched();
    this.fileRemoved.emit();
    this.imageRemoved.emit();
  }

  getPreviewUrl(): string | null {
    // Use external preview if provided, otherwise use internal preview
    if (this.imagePreview) {
      return this.imagePreview;
    }
    if (this.internalPreview && typeof this.internalPreview === 'string') {
      return this.internalPreview;
    }
    return null;
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value instanceof File) {
      this.processFile(value);
    } else if (typeof value === 'string') {
      this.imagePreview = value;
      this.fileName = 'Image';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }
} 