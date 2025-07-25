import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, NgZone, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IconEditButtonComponent } from '../buttons/icon-edit-button.component';
import { IconDeleteButtonComponent } from '../buttons/icon-delete-button.component';

export interface TableColumn {
  label: string;
  field: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  headerClass?: string; // mới
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatIconModule, IconEditButtonComponent, IconDeleteButtonComponent],
  template: `
    <div class="table-wrapper" #tableWrapper>
      <table class="admin-table">
        <thead>
          <tr>
            <th class="table-col-stt">#</th>
            <th *ngFor="let col of columns; let i = index"
                [ngClass]="getStickyClass(i) + ' table-content-col ' + (col.headerClass ? col.headerClass : getDefaultHeaderClass(i))"
                [style.width]="i === columns.length - 1 ? '204px' : col.width"
                [style.minWidth]="i === columns.length - 1 ? '204px' : col.width"
                [style.maxWidth]="i === columns.length - 1 ? '204px' : col.width">
              {{ col.label }}
            </th>
            <th class="table-col-actions">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of data; let i = index">
            <td class="table-col-stt">{{ i + 1 }}</td>
            <td *ngFor="let col of columns; let i = index"
                [ngClass]="getStickyClass(i) + ' table-content-col'"
                [style.width]="i === columns.length - 1 ? '204px' : col.width"
                [style.minWidth]="i === columns.length - 1 ? '204px' : col.width"
                [style.maxWidth]="i === columns.length - 1 ? '204px' : col.width">
              <ng-container [ngSwitch]="getCellType(row[col.field], col.field)">
                <!-- Boolean: canh giữa, icon -->
                <span *ngSwitchCase="'bool'" class="d-flex justify-content-center align-items-center">
                  <mat-icon [ngClass]="row[col.field] ? 'text-success' : 'text-danger'">
                    {{ row[col.field] ? 'check_circle' : 'cancel' }}
                  </mat-icon>
                </span>
                <!-- Số: canh giữa -->
                <span *ngSwitchCase="'number'" class="d-flex justify-content-center">{{ row[col.field] }}</span>
                <!-- Tiền tệ: canh phải, định dạng -->
                <span *ngSwitchCase="'currency'" class="d-flex justify-content-end">{{ row[col.field] | number:'1.0-0' }} ₫</span>
                <!-- Chuỗi: canh trái -->
                <span *ngSwitchDefault class="d-flex justify-content-start">{{ row[col.field] }}</span>
              </ng-container>
            </td>
            <td class="table-col-actions">
              <app-icon-edit-button (click)="edit.emit(row)" ariaLabel="Sửa"></app-icon-edit-button>
              <app-icon-delete-button (click)="delete.emit(row)" ariaLabel="Xóa"></app-icon-delete-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-wrapper {
      width: 100%;
      background: $white;
      border-radius: $border-radius-lg;
      box-shadow: $shadow-md;
      overflow-x: auto;
    }
    .admin-table {
      width: 100%;
      table-layout: fixed;
      border-collapse: separate;
      border-spacing: 0;
      height: auto;
    }
    thead tr {
      background: #dce1e1 ;
    }
    thead th {
      color: #000;
      font-weight: 500;
      text-align: center;
      padding: 1rem 0.5rem;
      white-space: nowrap;
      font-size: 1.125rem;
    }
    th.header-name {
      background: #e0e4e4;
      color: #222;
      font-weight: 700;
    }
    th.header-desc {
      background: #dce1e1;
      color: #333;
    }
    th.header-pos {
      background: #e0e4e4;
      color: #8B4513;
    }
    th.header-status {
      background: #dce1e1;
      color: #C19A6B;
      text-align: center;
    }
    th.header-default {
      background: #e0e4e4 !important;
      color: #222 !important;
      font-weight: 600 !important;
    }
    .table-col-stt {
      width: 65px;
      min-width: 65px;
      max-width: 65px;
      text-align: center;
      position: sticky;
      left: 0;
      z-index: 3;
      background: #f5f5f5;
      border-right: 1px solid #e0e0e0;
    }
    .fixed-col-2 {
      width: 400px;
      min-width: 400px;
      max-width: 400px;
      position: sticky;
      left: 60px;
      z-index: 2;
      background: #fff;
      border-right: 1px solid #e0e0e0;
    }
    .table-col-actions {
      width: 160px;
      min-width: 160px;
      max-width: 160px;
      text-align: center;
      padding: 0;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.6rem;
      position: sticky;
      right: 0;
      z-index: 3;
      background: #f5f5f5;
      border-left: 1px solid #e0e0e0;
    }
    .admin-table td:last-child, .admin-table th:last-child {
      padding-right: 0 !important;
      margin-right: 0 !important;
    }
    tbody td {
      padding: 0.75rem 0.5rem;
      color: $dark-gray;
      font-size: 1.125rem;
      vertical-align: middle;
      background: $white;
      border-bottom: 1px solid #eee;
    }
    tbody tr:last-child td {
      border-bottom: none;
    }
    .status-chip {
      display: inline-flex;
      align-items: center;
      padding: 0.4rem 0.8rem;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 600;
      color: #fff;
      gap: 0.5rem;
    }
    .status-chip.active {
      background-color: $success;
    }
    .status-chip.inactive {
      background-color: $danger;
    }
    @media (max-width: 600px) {
      .table-wrapper {
        overflow-x: auto;
      }
      thead th, tbody td {
        font-size: 0.95rem;
        padding: 0.4rem 0.2rem;
      }
      .table-col-actions {
        gap: 0.2rem;
      }
    }
    :host ::ng-deep th {
      background: #f5f5f5 !important;
      color: #222;
      font-weight: 600;
      border-right: 1px solid #d0d0d0 !important;
    }
    :host ::ng-deep th:last-child {
      border-right: none !important;
    }
    .sticky-col-1 {
      position: sticky;
      left: 0;
      z-index: 3;
      background: #f5f5f5 !important;
    }
    .sticky-col-2 {
      position: sticky;
      left: 0;
      z-index: 2;
      background: #fff;
    }
    .sticky-col-last {
      position: sticky;
      right: 0;
      z-index: 3;
      background: #f5f5f5 !important;
      width: 204px !important;
      min-width: 204px !important;
      max-width: 204px !important;
    }
    .table-content-col {
      background: #fff !important;
    }
  `]
})
export class TableComponent implements AfterViewInit, OnDestroy {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @ViewChild('tableWrapper', { static: false }) tableWrapperRef!: ElementRef;
  tableWidth = 0;
  resizeObserver: ResizeObserver | null = null;
  contentColWidths: string[] = [];
  showFiller = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.updateTableWidthAndContentCols();
    this.resizeObserver = new ResizeObserver(() => {
      this.ngZone.run(() => this.updateTableWidthAndContentCols());
    });
    const wrapper = document.querySelector('.table-wrapper') as HTMLElement;
    if (wrapper && this.resizeObserver) {
      this.resizeObserver.observe(wrapper);
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  updateTableWidthAndContentCols() {
    const wrapper = document.querySelector('.table-wrapper') as HTMLElement;
    if (wrapper) {
      this.tableWidth = wrapper.offsetWidth;
      // Tính tổng width các cột (sticky + nội dung)
      const stickyPx = 60 + 160;
      const contentColCount = this.columns.length - 2;
      const remain = this.tableWidth - stickyPx;
      // Giả sử mỗi cột nội dung tối thiểu 120px
      const totalContentPx = contentColCount * 120;
      // Nếu tổng sticky + nội dung < tableWidth, cần filler
      this.showFiller = (stickyPx + totalContentPx < this.tableWidth);
      this.contentColWidths = Array(contentColCount).fill('');
    }
  }

  getDefaultHeaderClass(index: number): string {
    return `header-variant-${index % 5}`;
  }

  getStickyClass(idx: number): string {
    if (idx === 0) return 'sticky-col-1';
    if (idx === this.columns.length - 1) return 'sticky-col-last';
    return '';
  }

  getCellType(value: any, field: string): 'bool' | 'number' | 'currency' | 'string' {
    if (typeof value === 'boolean' || field.startsWith('is') || field.startsWith('has')) return 'bool';
    if (typeof value === 'number' && (field.toLowerCase().includes('price') || field.toLowerCase().includes('amount') || field.toLowerCase().includes('total'))) return 'currency';
    if (typeof value === 'number') return 'number';
    return 'string';
  }
} 