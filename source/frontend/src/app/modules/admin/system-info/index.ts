import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { CustomSpinnerComponent } from '../../../shared/components/custom-spinner/custom-spinner.component';
import { ImageUploadComponent } from '../../../shared/components/image-upload/image-upload.component';
import { ToastService } from '../../../core/services/toast.service';
import { BaseApiService } from '../../../core/services/base-api.service';
import { environment } from '../../../../environments/environment';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-system-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatChipsModule,
    CustomSpinnerComponent,
    ImageUploadComponent,
    ModalComponent
  ],
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class SystemInfoComponent implements OnInit {
  // State cho 4 block
  systemStatus = {
    status: 'Online',
    uptime: '12 ngày 4 giờ',
    memoryUsage: '1.2 GB / 4 GB',
    cpuUsage: '15%'
  };
  systemConfig = {
    facebookAppId: '123456789',
    googleAnalyticsId: 'G-ABCDEFGH',
    googleMapsApiKey: '',
    smtpServer: 'smtp.gmail.com'
  };
  databaseInfo = {
    dbType: 'PostgreSQL',
    version: '14.2',
    tableCount: 24
  };
  basicInfo = {
    siteName: 'CMS Demo',
    description: 'Hệ thống quản trị nội dung',
    logo: 'logo.png',
    favicon: 'favicon.ico',
    contactEmail: 'admin@cms.com',
    contactPhone: '0123456789',
    address: '123 Đường CMS, Quận 1, TP.HCM',
    socialLinks: 'facebook.com/cms, twitter.com/cms',
    metaKeywords: 'cms, quản trị, nội dung',
    metaDescription: 'CMS quản trị nội dung hiện đại, dễ dùng.'
  };

  // Modal state
  showBasicInfoModal = false;
  showContactInfoModal = false;
  showSystemConfigModal = false;
  isSubmitting = false;

  // Form
  basicInfoForm: FormGroup;
  contactInfoForm: FormGroup;
  systemConfigForm: FormGroup;
  logoPreviewUrl: string | null = null;
  faviconPreviewUrl: string | null = null;
  social = { facebook: '', youtube: '', zalo: '' };

  constructor(private fb: FormBuilder, private toastService: ToastService, private dialog: MatDialog) {
    this.basicInfoForm = this.fb.group({
      siteName: [this.basicInfo.siteName, [Validators.required, Validators.minLength(2)]],
      description: [this.basicInfo.description, [Validators.required, Validators.minLength(2)]],
      logo: [this.basicInfo.logo],
      favicon: [this.basicInfo.favicon],
      contactEmail: [this.basicInfo.contactEmail, [Validators.email]],
      contactPhone: [this.basicInfo.contactPhone],
      address: [this.basicInfo.address],
      facebook: [this.basicInfo.socialLinks?.split(',')[0]?.trim() || ''],
      youtube: [this.basicInfo.socialLinks?.split(',')[1]?.trim() || ''],
      zalo: [this.basicInfo.socialLinks?.split(',')[2]?.trim() || ''],
      metaKeywords: [this.basicInfo.metaKeywords],
      metaDescription: [this.basicInfo.metaDescription]
    });
    this.contactInfoForm = this.fb.group({
      email: ['admin@cms.com', [Validators.required, Validators.email]],
      phone: ['0123456789', [Validators.required, Validators.minLength(8)]],
      address: ['123 Đường CMS, Quận 1, TP.HCM', [Validators.required]],
      website: ['https://cms.com']
    });
    this.systemConfigForm = this.fb.group({
      facebookAppId: [this.systemConfig.facebookAppId],
      googleAnalyticsId: [this.systemConfig.googleAnalyticsId],
      googleMapsApiKey: [this.systemConfig.googleMapsApiKey],
      smtpServer: [this.systemConfig.smtpServer]
    });
    this.logoPreviewUrl = this.basicInfo.logo ? this.basicInfo.logo : null;
    this.faviconPreviewUrl = this.basicInfo.favicon ? this.basicInfo.favicon : null;
    // Tách socialLinks thành 3 trường nếu có dữ liệu
    if (this.basicInfo.socialLinks) {
      const arr = this.basicInfo.socialLinks.split(',').map(x => x.trim());
      this.social.facebook = arr[0] || '';
      this.social.youtube = arr[1] || '';
      this.social.zalo = arr[2] || '';
    }
  }

  ngOnInit(): void {
    if (this.showBasicInfoModal) {
      document.body.classList.add('modal-open');
    }
  }

  ngOnDestroy() {
    document.body.classList.remove('modal-open');
  }

  // Modal handler
  editSystemConfig() {
    this.systemConfigForm.patchValue(this.systemConfig);
    this.showSystemConfigModal = true;
  }
  closeSystemConfigModal() {
    this.showSystemConfigModal = false;
  }
  editBasicInfo() {
    this.basicInfoForm.patchValue(this.basicInfo);
    this.openBasicInfoModal();
  }
  openBasicInfoModal() {
    this.showBasicInfoModal = true;
    document.body.classList.add('modal-open');
  }
  closeBasicInfoModal() {
    this.showBasicInfoModal = false;
    document.body.classList.remove('modal-open');
  }
  editContactInfo() {
    this.contactInfoForm.patchValue({
      email: 'admin@cms.com',
      phone: '0123456789',
      address: '123 Đường CMS, Quận 1, TP.HCM',
      website: 'https://cms.com'
    });
    this.showContactInfoModal = true;
  }
  closeContactInfoModal() {
    this.showContactInfoModal = false;
  }

  // Form submit
  saveBasicInfo() {
    if (this.basicInfoForm.invalid) return;
    this.isSubmitting = true;
    // Gộp social lại thành 1 chuỗi
    const socialLinks = [
      this.basicInfoForm.value.facebook,
      this.basicInfoForm.value.youtube,
      this.basicInfoForm.value.zalo
    ].filter(x => x).join(', ');
    const formValue = { ...this.basicInfoForm.value, socialLinks };
    setTimeout(() => {
      this.basicInfo = { ...this.basicInfo, ...formValue };
      this.isSubmitting = false;
      this.closeBasicInfoModal();
    }, 1000);
  }
  saveContactInfo() {
    if (this.contactInfoForm.invalid) return;
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.closeContactInfoModal();
    }, 1000);
  }
  saveSystemConfig() {
    if (this.systemConfigForm.invalid) return;
    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.closeSystemConfigModal();
    }, 1000);
  }

  // Method cũ đã được thay thế bằng onLogoFileSelected(file: File)

  onLogoFileSelected(file: File) {
    // Preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.logoPreviewUrl = e.target.result;
    };
    reader.readAsDataURL(file);
    // TODO: Gọi API upload file lên server, lấy url trả về và set vào formControl logo
    // Giả lập: set luôn preview vào formControl logo
    this.basicInfoForm.patchValue({ logo: file.name });
  }

  removeLogo() {
    this.logoPreviewUrl = null;
    this.basicInfoForm.patchValue({ logo: '' });
  }

  onFaviconFileSelected(file: File) {
    // Preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.faviconPreviewUrl = e.target.result;
    };
    reader.readAsDataURL(file);
    // TODO: Gọi API upload file lên server, lấy url trả về và set vào formControl favicon
    // Giả lập: set luôn preview vào formControl favicon
    this.basicInfoForm.patchValue({ favicon: file.name });
  }

  removeFavicon() {
    this.faviconPreviewUrl = null;
    this.basicInfoForm.patchValue({ favicon: '' });
  }

  // Drop methods cũ đã được thay thế bằng image-upload component
  // Method cũ đã được thay thế bằng onFaviconFileSelected(file: File)
  // Methods cũ đã được thay thế bằng các method mới

  onOverlayMouseDown(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeBasicInfoModal();
    }
  }

  onClearCacheClick() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xác nhận',
        message: 'Bạn muốn xóa cache trình duyệt?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(';').forEach(function(c) {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(/=.*/, '=;expires=' + new Date(0).toUTCString() + ';path=/');
        });
        this.toastService.success('Đã xóa cache trình duyệt!');
      }
    });
  }

  // Validate helper
  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
  getFieldError(form: FormGroup, field: string): string {
    const control = form.get(field);
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'Trường này là bắt buộc';
    if (control.errors['minlength']) return `Tối thiểu ${control.errors['minlength'].requiredLength} ký tự`;
    if (control.errors['email']) return 'Email không hợp lệ';
    return 'Giá trị không hợp lệ';
  }
} 