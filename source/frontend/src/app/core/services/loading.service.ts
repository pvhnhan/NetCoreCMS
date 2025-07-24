import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LoadingState {
  isLoading: boolean;
  message: string;
  type?: 'spinner' | 'skeleton' | 'custom' | 'dots' | 'wave';
  spinnerType?: 'default' | 'custom' | 'dots' | 'wave';
  skeletonType?: 'card' | 'table' | 'list' | 'grid';
  skeletonItems?: number;
  spinnerSize?: 'small' | 'medium' | 'large';
  isFadingOut?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingStateSubject = new BehaviorSubject<LoadingState>({
    isLoading: false,
    message: 'Đang tải...',
    type: 'spinner',
    spinnerType: 'custom',
    spinnerSize: 'medium',
    isFadingOut: false
  });

  public loadingState$: Observable<LoadingState> = this.loadingStateSubject.asObservable();

  showSpinner(
    message: string = 'Đang tải...',
    type: 'default' | 'custom' | 'dots' | 'wave' = 'custom',
    size: 'small' | 'medium' | 'large' = 'medium'
  ): void {
    this.loadingStateSubject.next({
      isLoading: true,
      message,
      type: 'spinner',
      spinnerType: type,
      spinnerSize: size,
      isFadingOut: false
    });
  }

  showSkeleton(
    message: string = 'Đang tải dữ liệu...',
    type: 'card' | 'table' | 'list' | 'grid' = 'card',
    items: number = 3
  ): void {
    this.loadingStateSubject.next({
      isLoading: true,
      message,
      type: 'skeleton',
      skeletonType: type,
      skeletonItems: items,
      isFadingOut: false
    });
  }

  hide(): void {
    // Bắt đầu fade out
    this.loadingStateSubject.next({
      ...this.loadingStateSubject.value,
      isFadingOut: true
    });

    // Sau 300ms thì ẩn hoàn toàn
    setTimeout(() => {
      this.loadingStateSubject.next({
        isLoading: false,
        message: '',
        type: 'spinner',
        spinnerType: 'custom',
        spinnerSize: 'medium',
        isFadingOut: false
      });
    }, 300);
  }

  getCurrentLoadingState(): LoadingState {
    return this.loadingStateSubject.value;
  }

  getCurrentLoadingMessage(): string {
    return this.loadingStateSubject.value.message;
  }

  getCurrentLoadingType(): 'spinner' | 'skeleton' | 'custom' | 'dots' | 'wave' {
    return this.loadingStateSubject.value.type || 'spinner';
  }

  getCurrentSpinnerType(): 'default' | 'custom' | 'dots' | 'wave' {
    return this.loadingStateSubject.value.spinnerType || 'custom';
  }

  getCurrentSpinnerSize(): 'small' | 'medium' | 'large' {
    return this.loadingStateSubject.value.spinnerSize || 'medium';
  }

  isFadingOut(): boolean {
    return this.loadingStateSubject.value.isFadingOut || false;
  }
} 