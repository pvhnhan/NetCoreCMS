import { Injectable } from '@angular/core';

export interface ToastOptions {
  duration?: number;
  horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
  verticalPosition?: 'top' | 'bottom';
  panelClass?: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: HTMLElement[] = [];
  private container: HTMLElement | null = null;

  constructor() {
    this.createContainer();
  }

  private createContainer(): void {
    // Kiểm tra xem container đã tồn tại chưa
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      // Nếu không có container trong HTML, tạo mới
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.style.position = 'fixed';
      this.container.style.top = '100px';
      this.container.style.right = '20px';
      this.container.style.zIndex = '100000';
      this.container.style.pointerEvents = 'none';
      this.container.style.display = 'flex';
      this.container.style.flexDirection = 'column';
      this.container.style.gap = '10px';
      this.container.style.maxWidth = '400px';
      
      document.body.appendChild(this.container);
    }
  }

  success(message: string, options?: ToastOptions): void {
    this.showToast(message, 'success', options);
  }

  error(message: string, options?: ToastOptions): void {
    this.showToast(message, 'error', options);
  }

  warning(message: string, options?: ToastOptions): void {
    this.showToast(message, 'warning', options);
  }

  info(message: string, options?: ToastOptions): void {
    this.showToast(message, 'info', options);
  }

  private showToast(message: string, type: 'success' | 'error' | 'warning' | 'info', options?: ToastOptions): void {
    // Đảm bảo container tồn tại
    if (!this.container) {
      this.createContainer();
    }

    // Xóa toast cũ cùng loại và message để tránh hiển thị liên tục
    this.removeToastsByTypeAndMessage(type, message);

    // Tạo toast element
    const toastElement = document.createElement('div');
    toastElement.className = `toast-message ${type}`;
    toastElement.style.cssText = `
      display: flex;
      align-items: center;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.25);
      margin-bottom: 8px;
      animation: slideIn 0.3s ease-out;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      z-index: 100001;
      pointer-events: auto;
      max-width: 400px;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;
    `;

    // Set background color dựa trên type
    switch (type) {
      case 'success':
        toastElement.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
        break;
      case 'error':
        toastElement.style.background = 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
        break;
      case 'warning':
        toastElement.style.background = 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)';
        break;
      case 'info':
        toastElement.style.background = 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)';
        break;
    }

    // Tạo icon
    const iconElement = document.createElement('span');
    iconElement.style.cssText = `
      margin-right: 12px;
      font-size: 20px;
      font-family: 'Material Icons';
    `;
    
    switch (type) {
      case 'success':
        iconElement.textContent = '✓';
        break;
      case 'error':
        iconElement.textContent = '✕';
        break;
      case 'warning':
        iconElement.textContent = '⚠';
        break;
      case 'info':
        iconElement.textContent = 'ℹ';
        break;
    }

    // Tạo text
    const textElement = document.createElement('span');
    textElement.textContent = message;
    textElement.style.flex = '1';

    // Tạo close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.style.cssText = `
      margin-left: 8px;
      background: none;
      border: none;
      color: rgba(255,255,255,0.8);
      cursor: pointer;
      font-size: 16px;
      padding: 4px;
      border-radius: 4px;
      transition: all 0.2s ease;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.color = 'white';
      closeButton.style.transform = 'scale(1.1)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.color = 'rgba(255,255,255,0.8)';
      closeButton.style.transform = 'scale(1)';
    });

    // Thêm elements vào toast
    toastElement.appendChild(iconElement);
    toastElement.appendChild(textElement);
    toastElement.appendChild(closeButton);

    // Thêm vào container
    if (this.container) {
      this.container.appendChild(toastElement);
    }
    
    // Thêm vào tracking array
    this.toasts.push(toastElement);
    
    // Tự động xóa sau duration
    const duration = options?.duration || 4000;
    const timeoutId = setTimeout(() => {
      this.removeToast(toastElement);
    }, duration);
    
    // Xử lý close button click
    closeButton.addEventListener('click', () => {
      clearTimeout(timeoutId);
      this.removeToast(toastElement);
    });

    // Giới hạn số lượng toast hiển thị (tối đa 3)
    if (this.toasts.length > 3) {
      const oldestToast = this.toasts.shift();
      if (oldestToast) {
        this.removeToast(oldestToast);
      }
    }
  }

  private removeToastsByMessage(message: string): void {
    this.toasts = this.toasts.filter(toast => {
      const textElement = toast.querySelector('span:nth-child(2)');
      if (textElement && textElement.textContent === message) {
        this.removeToast(toast);
        return false;
      }
      return true;
    });
  }

  private removeToastsByType(type: string): void {
    this.toasts = this.toasts.filter(toast => {
      if (toast.classList.contains(type)) {
        this.removeToast(toast);
        return false;
      }
      return true;
    });
  }

  private removeToastsByTypeAndMessage(type: string, message: string): void {
    this.toasts = this.toasts.filter(toast => {
      const textElement = toast.querySelector('span:nth-child(2)');
      if (toast.classList.contains(type) && textElement && textElement.textContent === message) {
        this.removeToast(toast);
        return false;
      }
      return true;
    });
  }

  private removeToast(toastElement: HTMLElement): void {
    const index = this.toasts.indexOf(toastElement);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
    
    if (toastElement.parentNode) {
      toastElement.parentNode.removeChild(toastElement);
    }
  }

  clearAll(): void {
    this.toasts.forEach(toast => this.removeToast(toast));
  }

  // Cleanup khi service bị destroy
  ngOnDestroy(): void {
    this.clearAll();
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
} 