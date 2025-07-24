import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    <div class="table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th class="table-col-stt">#</th>
            <th *ngFor="let col of columns; let i = index"
                [style.width]="col.width"
                [ngClass]="col.headerClass ? col.headerClass : getDefaultHeaderClass(i)">
              {{ col.label }}
            </th>
            <th class="table-col-actions">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of data; let i = index">
            <td class="table-col-stt">{{ i + 1 }}</td>
            <td *ngFor="let col of columns">
              <ng-container *ngIf="col.field === 'isActive'; else normalCell">
                <span class="status-chip" [ngClass]="row.isActive ? 'active' : 'inactive'">
                  <mat-icon>{{ row.isActive ? 'check_circle' : 'cancel' }}</mat-icon>
                  {{ row.isActive ? 'Hoạt động' : 'Không hoạt động' }}
                </span>
              </ng-container>
              <ng-template #normalCell>
                {{ row[col.field] }}
              </ng-template>
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
      width: 5%;
      text-align: center;
    }
    .table-col-actions {
      width: 100%;
      text-align: center;
      padding: 0;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.6rem;
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
  `]
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  getDefaultHeaderClass(index: number): string {
    return `header-variant-${index % 5}`;
  }

  getColWidth(idx: number) {
    if (this.columns.length === 3) {
      // Tên 25%, Mô tả 45%, Trạng thái 15%
      return ["25%", "45%", "15%"][idx];
    }
    return '';
  }
} 