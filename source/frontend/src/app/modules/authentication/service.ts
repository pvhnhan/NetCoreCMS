import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseApiService, ApiResponse } from '../../core/services/base-api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface GetProfileRequest {
  username: string;
}

export interface UpdateProfileRequest {
  username: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  address?: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  refreshToken?: string;
  expriedToken?: string;
  message?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    console.log('loadUserFromStorage - token:', token);
    console.log('loadUserFromStorage - userStr:', userStr);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('loadUserFromStorage - parsed user:', user);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing user from storage:', error);
        this.logout();
      }
    } else {
      console.log('No token or user in storage');
    }
  }

  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(this.getApiUrl('/auth/login'), credentials)
      .pipe(
        tap(response => {
          console.log('AuthService login response:', response); // Debug log
          console.log('Response statusCode:', response.statusCode);
          console.log('Response data:', response.data);
          console.log('Response message:', response.message);
          
          // Chỉ xử lý khi đăng nhập thành công hoàn toàn
          if (response.statusCode === 200 && response.data && response.data.token) {
            console.log('Login successful, setting tokens');
            // Lưu token trước
            localStorage.setItem('token', response.data.token);
            if (response.data.refreshToken) {
              localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            
            // Sau đó gọi API profile để lấy thông tin user bằng username
            this.getProfile(credentials.username).subscribe({
              next: (profileResponse) => {
                console.log('Profile response:', profileResponse);
                if (profileResponse.statusCode === 200 && profileResponse.data) {
                  console.log('Setting user data from profile');
                  this.setUserData(profileResponse.data);
                }
              },
              error: (error) => {
                console.error('Error getting profile:', error);
                // Không logout khi có lỗi profile, chỉ log error
              }
            });
          } else {
            console.log('Login not successful - statusCode or data invalid');
            // Không lưu token hoặc user data khi không thành công
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }

  register(userData: RegisterRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.getApiUrl('/auth/register'), userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getProfile(username?: string): Observable<ApiResponse<User>> {
    if (username) {
      const request: GetProfileRequest = { username: username };
      return this.http.post<ApiResponse<User>>(this.getApiUrl('/auth/profile'), request);
    } else {
      return this.http.get<ApiResponse<User>>(this.getApiUrl('/auth/profile'));
    }
  }

  updateProfile(userData: Partial<User>, username?: string): Observable<ApiResponse<User>> {
    if (username) {
      const request: UpdateProfileRequest = {
        username: username,
        fullName: userData.fullName || '',
        email: userData.email || '',
        phone: userData.phone,
        address: userData.address,
        avatar: userData.avatar
      };
      return this.http.post<ApiResponse<User>>(this.getApiUrl('/auth/profile/update'), request)
        .pipe(
          tap(response => {
            if (response.statusCode === 200) {
              this.updateCurrentUser(response.data);
            }
          })
        );
    } else {
      return this.http.put<ApiResponse<User>>(this.getApiUrl('/auth/profile'), userData)
        .pipe(
          tap(response => {
            if (response.statusCode === 200) {
              this.updateCurrentUser(response.data);
            }
          })
        );
    }
  }

  changePassword(passwordData: ChangePasswordRequest): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(this.getApiUrl('/auth/change-password'), passwordData);
  }

  refreshToken(): Observable<ApiResponse<{ token: string; refreshToken: string }>> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<ApiResponse<{ token: string; refreshToken: string }>>(
      this.getApiUrl('/auth/refresh-token'),
      { refreshToken }
    ).pipe(
      tap(response => {
        if (response.statusCode === 200) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
      })
    );
  }

  private setUserData(userData: User): void {
    console.log('setUserData called with:', userData);
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    console.log('Setting currentUserSubject with user:', userData);
    this.currentUserSubject.next(userData);
    
    console.log('Current user after setUserData:', this.getCurrentUser());
  }

  public setAuthData(data: LoginResponse): void {
    console.log('setAuthData called with:', data);
    console.log('Token:', data.token);
    
    localStorage.setItem('token', data.token);
    if (data.refreshToken) {
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    
    console.log('Current user after setAuthData:', this.getCurrentUser());
  }

  private updateCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token') && !!this.getCurrentUser();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }
} 