import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService, ApiResponse } from '../../../core/services/base-api.service';

export interface CategoryType {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryTypeService extends BaseApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getCategoryTypes(): Observable<ApiResponse<CategoryType[]>> {
    return this.http.get<ApiResponse<CategoryType[]>>(this.getApiUrl('/category-type'));
  }

  getCategoryTypeById(id: number): Observable<ApiResponse<CategoryType>> {
    return this.http.get<ApiResponse<CategoryType>>(this.getApiUrl(`/category-type/${id}`));
  }

  createCategoryType(categoryType: Partial<CategoryType>): Observable<ApiResponse<CategoryType>> {
    return this.http.post<ApiResponse<CategoryType>>(this.getApiUrl('/category-type'), categoryType);
  }

  updateCategoryType(id: number, categoryType: Partial<CategoryType>): Observable<ApiResponse<CategoryType>> {
    return this.http.put<ApiResponse<CategoryType>>(this.getApiUrl(`/category-type/${id}`), categoryType);
  }

  deleteCategoryType(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(this.getApiUrl(`/category-type/${id}`));
  }
} 