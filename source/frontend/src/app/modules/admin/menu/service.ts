import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../core/services/base-api.service';

export interface Menu {
  id: number;
  name: string;
  url: string;
  icon: string;
  parentId?: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  children?: Menu[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getMenus(): Observable<ApiResponse<Menu[]>> {
    return this.http.get<ApiResponse<Menu[]>>(this.getApiUrl('/menu'));
  }

  getMenuById(id: number): Observable<ApiResponse<Menu>> {
    return this.http.get<ApiResponse<Menu>>(this.getApiUrl(`/menu/${id}`));
  }

  createMenu(menu: Partial<Menu>): Observable<ApiResponse<Menu>> {
    return this.http.post<ApiResponse<Menu>>(this.getApiUrl('/menu'), menu);
  }

  updateMenu(id: number, menu: Partial<Menu>): Observable<ApiResponse<Menu>> {
    return this.http.put<ApiResponse<Menu>>(this.getApiUrl(`/menu/${id}`), menu);
  }

  deleteMenu(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.getApiUrl(`/menu/${id}`));
  }
} 