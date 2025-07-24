import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService, ApiResponse } from '../../../core/services/base-api.service';

export interface SystemInfo {
  id: number;
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  logoUrl: string;
  faviconUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  metaKeywords: string;
  metaDescription: string;
  googleAnalyticsId: string;
  googleTagManagerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BasicInfo {
  websiteName: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  website: string;
}

export interface SystemConfig {
  facebookAppId?: string;
  googleAnalyticsId?: string;
  googleMapsApiKey?: string;
  smtpServer?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SystemInfoService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getSystemInfo(): Observable<ApiResponse<SystemInfo>> {
    return this.http.get<ApiResponse<SystemInfo>>(this.getApiUrl('/system-info'));
  }

  updateSystemInfo(systemInfo: Partial<SystemInfo>): Observable<ApiResponse<SystemInfo>> {
    return this.http.put<ApiResponse<SystemInfo>>(this.getApiUrl('/system-info'), systemInfo);
  }

  updateBasicInfo(basicInfo: BasicInfo): Observable<ApiResponse<SystemInfo>> {
    return this.http.put<ApiResponse<SystemInfo>>(this.getApiUrl('/system-info/basic'), basicInfo);
  }

  updateContactInfo(contactInfo: ContactInfo): Observable<ApiResponse<SystemInfo>> {
    return this.http.put<ApiResponse<SystemInfo>>(this.getApiUrl('/system-info/contact'), contactInfo);
  }

  updateSystemConfig(systemConfig: SystemConfig): Observable<ApiResponse<SystemInfo>> {
    return this.http.put<ApiResponse<SystemInfo>>(this.getApiUrl('/system-info/config'), systemConfig);
  }
} 