import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';

let activeRequests = 0;
let loadingTimeout: any;

export const loadingInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<any> => {
  const loadingService = inject(LoadingService);
  activeRequests++;
  
  // Chỉ hiển thị loading sau 300ms để tránh flash cho request nhanh
  loadingTimeout = setTimeout(() => {
    loadingService.showSpinner('Đang tải...', 'custom', 'medium');
  }, 300);

  return next(request).pipe(
    tap(
      (event) => {
        if (event instanceof HttpResponse) {
          activeRequests--;
          clearTimeout(loadingTimeout);
          if (activeRequests === 0) {
            loadingService.hide();
          }
        }
      },
      (error) => {
        activeRequests--;
        clearTimeout(loadingTimeout);
        if (activeRequests === 0) {
          loadingService.hide();
        }
      }
    )
  );
}; 