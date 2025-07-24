import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService, User } from '../service';
import { ApiResponse } from '../../../core/services/base-api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading = false;
  isSubmitting = false;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading = true;
    this.authService.getProfile().subscribe({
      next: (response: ApiResponse<User>) => {
        if (response.statusCode === 200) {
          this.currentUser = response.data;
          this.profileForm.patchValue({
            fullName: response.data.fullName,
            email: response.data.email,
            phone: response.data.phone || '',
            address: response.data.address || ''
          });
        } else {
          this.snackBar.open(response.message || 'Không thể tải thông tin profile', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error: (error: any) => {
        console.error('Load profile error:', error);
        this.snackBar.open('Lỗi kết nối khi tải thông tin profile', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isSubmitting = true;
      const profileData = this.profileForm.value;

      this.authService.updateProfile(profileData).subscribe({
        next: (response: ApiResponse<User>) => {
          if (response.statusCode === 200) {
            this.snackBar.open('Cập nhật profile thành công!', 'Đóng', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.currentUser = response.data;
          } else {
            this.snackBar.open(response.message || 'Không thể cập nhật profile', 'Đóng', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        },
        error: (error: any) => {
          console.error('Update profile error:', error);
          this.snackBar.open('Lỗi kết nối khi cập nhật profile', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getRoleDisplayName(role: string | undefined): string {
    if (!role) return 'Người dùng';
    
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'manager':
        return 'Quản lý';
      case 'editor':
        return 'Biên tập viên';
      default:
        return 'Người dùng';
    }
  }
} 