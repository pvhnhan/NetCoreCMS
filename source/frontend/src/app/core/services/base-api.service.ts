import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected baseUrl: string;
  private readonly TIMEOUT_MS = 10000; // 10 seconds
  private readonly MAX_RETRIES = 3;

  constructor(protected http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  protected getApiUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  protected getFullUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  protected isSuccessResponse(response: ApiResponse<any>): boolean {
    return response.statusCode === 200;
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Đã xảy ra lỗi không xác định';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Lỗi kết nối: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng hoặc SSL certificate.';
          break;
        case 400:
          errorMessage = 'Yêu cầu không hợp lệ';
          break;
        case 401:
          errorMessage = 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.';
          break;
        case 403:
          errorMessage = 'Bạn không có quyền truy cập tài nguyên này';
          break;
        case 404:
          errorMessage = 'Không tìm thấy tài nguyên yêu cầu';
          break;
        case 500:
          errorMessage = 'Lỗi máy chủ nội bộ';
          break;
        default:
          errorMessage = `Lỗi ${error.status}: ${error.message}`;
      }
    }

    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }

  protected createRequest<T>(request: Observable<T>): Observable<T> {
    return request.pipe(
      timeout(this.TIMEOUT_MS),
      retry(this.MAX_RETRIES),
      catchError(this.handleError)
    );
  }
} 