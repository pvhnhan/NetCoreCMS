import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class LoadingSkeletonComponent {
  @Input() type: 'card' | 'table' | 'list' | 'grid' = 'card';
  @Input() items: number = 3;
  @Input() showHeader: boolean = true;
  @Input() showText: boolean = true;
  @Input() loadingText: string = 'Đang tải dữ liệu...';

  get itemsArray(): number[] {
    return Array.from({ length: this.items }, (_, i) => i);
  }

  trackByFn(index: number): number {
    return index;
  }
} 