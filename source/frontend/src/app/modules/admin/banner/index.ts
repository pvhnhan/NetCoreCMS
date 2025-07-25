import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IconAddButtonComponent } from '../../../shared/components/buttons/icon-add-button.component';
import { CustomSpinnerComponent } from '../../../shared/components/custom-spinner/custom-spinner.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ImageUploadComponent } from '../../../shared/components/image-upload/image-upload.component';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    IconAddButtonComponent,
    CustomSpinnerComponent,
    ModalComponent,
    ImageUploadComponent
  ],
  styleUrls: ['./style.scss'],
  templateUrl: './index.html',
})
export class BannerComponent implements OnInit {
  banners: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showDialog = false;
  isEditing = false;
  isSubmitting = false;
  bannerForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  isDragOver = false;
  placeholderImage = 'assets/images/placeholder.jpg';
  selectedFileName: string = '';
  uploadError: string = '';

  constructor(private fb: FormBuilder) {
    this.bannerForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      imageFile: [null, Validators.required],
      order: [1, [Validators.required, Validators.min(1)]],
      position: ['top', Validators.required],
      isPoster: [false],
      link: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadBanners();
  }

  loadBanners(): void {
    this.isLoading = true;
    this.errorMessage = '';
    setTimeout(() => {
      this.banners = [
        { id: 1, title: 'Banner Chào Mừng', description: 'Banner chào mừng khách hàng đến với website', imageUrl: this.placeholderImage, link: 'https://example.com', isActive: true },
        { id: 2, title: 'Banner Khuyến Mãi', description: 'Banner quảng cáo các chương trình khuyến mãi', imageUrl: this.placeholderImage, link: 'https://example.com/promotion', isActive: true },
        { id: 3, title: 'Banner Sản Phẩm Mới', description: 'Banner giới thiệu các sản phẩm mới nhất', imageUrl: this.placeholderImage, link: 'https://example.com/new-products', isActive: false },
        { id: 4, title: 'Banner Liên Hệ', description: 'Banner thông tin liên hệ và hỗ trợ khách hàng', imageUrl: this.placeholderImage, link: 'https://example.com/contact', isActive: true }
      ];
      this.isLoading = false;
    }, 1000);
  }

  openAddDialog(): void {
    this.isEditing = false;
    this.bannerForm.reset({ 
      order: 1, 
      position: 'top', 
      isPoster: false, 
      isActive: true 
    });
    this.imagePreview = null;
    this.showDialog = true;
  }

  editBanner(banner: any): void {
    this.isEditing = true;
    this.bannerForm.patchValue(banner);
    this.imagePreview = banner.imageUrl;
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.bannerForm.reset();
    this.imagePreview = null;
    this.isSubmitting = false;
  }

  saveBanner(): void {
    if (this.bannerForm.invalid) return;
    this.isSubmitting = true;
    const bannerData = this.bannerForm.value;
    setTimeout(() => {
      if (this.isEditing) {
        const index = this.banners.findIndex(b => b.id === bannerData.id);
        if (index !== -1) this.banners[index] = { ...this.banners[index], ...bannerData };
        this.successMessage = '✅ Banner đã được cập nhật thành công!';
      } else {
        const newBanner = { ...bannerData, id: this.banners.length + 1 };
        this.banners.unshift(newBanner);
        this.successMessage = '✅ Banner đã được thêm thành công!';
      }
      this.closeDialog();
      this.isSubmitting = false;
      setTimeout(() => { this.successMessage = ''; }, 3000);
    }, 1000);
  }

  deleteBanner(id: number): void {
    if (confirm('❓ Bạn muốn xóa banner này?')) {
      this.banners = this.banners.filter(b => b.id !== id);
      this.successMessage = '✅ Banner đã được xóa thành công!';
      setTimeout(() => { this.successMessage = ''; }, 3000);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.bannerForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.bannerForm.get(fieldName);
    if (!field || !field.errors) return '';
    if (field.errors['required']) return 'Trường này là bắt buộc';
    if (field.errors['minlength']) return `Tối thiểu ${field.errors['minlength'].requiredLength} ký tự`;
    if (field.errors['pattern']) return 'URL không hợp lệ';
    return 'Giá trị không hợp lệ';
  }

  onImageError(event: any): void {
    event.target.src = this.placeholderImage;
  }

  onFileSelected(file: File): void {
    this.bannerForm.patchValue({ imageFile: file });
    const reader = new FileReader();
    reader.onload = e => this.imagePreview = reader.result;
    reader.readAsDataURL(file);
    this.selectedFileName = file.name;
  }

  onUploadError(error: string): void {
    this.uploadError = error;
    setTimeout(() => { this.uploadError = ''; }, 3000);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.onFileSelected(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  removeImage(): void {
    this.bannerForm.patchValue({ imageFile: null });
    this.imagePreview = null;
    this.selectedFileName = '';
  }
} 