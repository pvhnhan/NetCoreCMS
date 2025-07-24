import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IconAddButtonComponent } from '../../../shared/components/buttons/icon-add-button.component';
import { IconEditButtonComponent } from '../../../shared/components/buttons/icon-edit-button.component';
import { IconDeleteButtonComponent } from '../../../shared/components/buttons/icon-delete-button.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { CustomSpinnerComponent } from '../../../shared/components/custom-spinner/custom-spinner.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    IconAddButtonComponent,
    IconEditButtonComponent,
    IconDeleteButtonComponent,
    TableComponent,
    CustomSpinnerComponent
  ],
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class MenuComponent implements OnInit {
  menus: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showDialog = false;
  isEditing = false;
  isSubmitting = false;
  menuForm: FormGroup;
  tableColumns = [
    { label: 'Tên menu', field: 'name', width: '25%', headerClass: 'header-name' },
    { label: 'Mô tả', field: 'description', width: '35%', headerClass: 'header-desc' },
    { label: 'Vị trí', field: 'position', width: '15%', headerClass: 'header-pos' },
    { label: 'Trạng thái', field: 'isActive', width: '10%', headerClass: 'header-status' }
  ];

  constructor(private fb: FormBuilder) {
    this.menuForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      position: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.isLoading = true;
    this.errorMessage = '';
    setTimeout(() => {
      this.menus = [
        { id: 1, name: 'Menu chính', description: 'Menu chính của website', position: 'Top', isActive: true },
        { id: 2, name: 'Menu phụ', description: 'Menu phụ cho các trang con', position: 'Bottom', isActive: false }
      ];
      this.isLoading = false;
    }, 1000);
  }

  openAddDialog(): void {
    this.isEditing = false;
    this.menuForm.reset({ isActive: true });
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.menuForm.reset({ isActive: true });
  }

  editMenu(menu: any): void {
    this.isEditing = true;
    this.menuForm.patchValue(menu);
    this.showDialog = true;
  }

  deleteMenu(id: number): void {
    this.menus = this.menus.filter(m => m.id !== id);
    this.successMessage = '✅ Menu đã được xóa thành công!';
    setTimeout(() => { this.successMessage = ''; }, 3000);
  }

  saveMenu(): void {
    if (this.menuForm.invalid) return;
    this.isSubmitting = true;
    const menuData = this.menuForm.value;
    setTimeout(() => {
      if (this.isEditing) {
        const idx = this.menus.findIndex(m => m.id === menuData.id);
        if (idx !== -1) this.menus[idx] = { ...this.menus[idx], ...menuData };
        this.successMessage = '✅ Menu đã được cập nhật thành công!';
      } else {
        const newMenu = { ...menuData, id: this.menus.length + 1 };
        this.menus.unshift(newMenu);
        this.successMessage = '✅ Menu đã được thêm thành công!';
      }
      this.closeDialog();
      this.isSubmitting = false;
      setTimeout(() => { this.successMessage = ''; }, 3000);
    }, 1000);
  }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldError(form: FormGroup, field: string): string {
    const control = form.get(field);
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'Trường này là bắt buộc';
    if (control.errors['minlength']) return `Tối thiểu ${control.errors['minlength'].requiredLength} ký tự`;
    return 'Giá trị không hợp lệ';
  }
} 