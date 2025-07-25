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
  selector: 'app-category-type',
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
  styleUrls: ['style.scss'],
})
export class CategoryTypeComponent implements OnInit {
  categoryTypes: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showDialog = false;
  isEditing = false;
  isSubmitting = false;
  categoryForm: FormGroup;
  tableColumns = [    
    { label: 'Tên loại danh mục', field: 'name', width: '25%' },
    { label: 'Mô tả', field: 'description', width: '50%' },
    { label: 'Trạng thái', field: 'isActive', width: '12%' }    
  ];

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadCategoryTypes();
  }

  loadCategoryTypes(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    // Simulate API call
    setTimeout(() => {
      this.categoryTypes = [
        {
          id: 1,
          name: 'Sản phẩm',
          description: 'Danh mục cho các sản phẩm',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Dịch vụ',
          description: 'Danh mục cho các dịch vụ',
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Tin tức',
          description: 'Danh mục cho tin tức',
          isActive: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      this.isLoading = false;
    }, 1000);
  }

  openAddDialog(): void {
    this.isEditing = false;
    this.categoryForm.reset({
      isActive: true
    });
    this.showDialog = true;
  }

  editCategory(category: any): void {
    this.isEditing = true;
    this.categoryForm.patchValue(category);
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.categoryForm.reset();
    this.isSubmitting = false;
  }

  saveCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const categoryData = this.categoryForm.value;

    // Simulate API call
    setTimeout(() => {
      if (this.isEditing) {
        // Update existing category
        const index = this.categoryTypes.findIndex(c => c.id === categoryData.id);
        if (index !== -1) {
          this.categoryTypes[index] = { ...this.categoryTypes[index], ...categoryData };
        }
        this.successMessage = '✅ Danh mục đã được cập nhật thành công!';
      } else {
        // Add new category
        const newCategory = {
          ...categoryData,
          id: this.categoryTypes.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.categoryTypes.unshift(newCategory);
        this.successMessage = '✅ Danh mục đã được thêm thành công!';
      }

      this.closeDialog();
      this.isSubmitting = false;
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }, 1000);
  }

  deleteCategory(id: number): void {
    if (confirm('❓ Bạn muốn xóa danh mục này?')) {
      this.categoryTypes = this.categoryTypes.filter(c => c.id !== id);
      this.successMessage = '✅ Danh mục đã được xóa thành công!';
      
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return 'Trường này là bắt buộc';
    }
    if (field.errors['minlength']) {
      return `Tối thiểu ${field.errors['minlength'].requiredLength} ký tự`;
    }
    return 'Giá trị không hợp lệ';
  }
} 