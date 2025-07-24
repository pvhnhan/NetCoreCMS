import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService, ApiResponse } from '../../../core/services/base-api.service';

export interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class BannerService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getBanners(page: number = 0, pageSize: number = 10): Observable<ApiResponse<{items: Banner[], totalItems: number}>> {
    return this.http.get<ApiResponse<{items: Banner[], totalItems: number}>>(
      this.getApiUrl(`/banner?page=${page}&pageSize=${pageSize}`)
    );
  }

  getBannerById(id: number): Observable<ApiResponse<Banner>> {
    return this.http.get<ApiResponse<Banner>>(this.getApiUrl(`/banner/${id}`));
  }

  createBanner(banner: Partial<Banner>): Observable<ApiResponse<Banner>> {
    return this.http.post<ApiResponse<Banner>>(this.getApiUrl('/banner'), banner);
  }

  updateBanner(id: number, banner: Partial<Banner>): Observable<ApiResponse<Banner>> {
    return this.http.put<ApiResponse<Banner>>(this.getApiUrl(`/banner/${id}`), banner);
  }

  deleteBanner(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.getApiUrl(`/banner/${id}`));
  }
} 