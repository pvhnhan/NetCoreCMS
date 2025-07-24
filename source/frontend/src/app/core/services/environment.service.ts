import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private readonly baseUrl = environment.apiUrl;
  private readonly assetsPath = '/assets';

  constructor() {}

  getApiUrl(): string {
    return this.baseUrl;
  }

  getAssetsPath(): string {
    return this.assetsPath;
  }

  getImagePath(imageName: string): string {
    return `${this.assetsPath}/images/${imageName}`;
  }

  getPlaceholderImage(): string {
    return this.getImagePath('placeholder.jpg');
  }

  getImageUrl(imagePath: string): string {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  }

  isProduction(): boolean {
    return environment.production;
  }

  isDevelopment(): boolean {
    return !environment.production;
  }
} 