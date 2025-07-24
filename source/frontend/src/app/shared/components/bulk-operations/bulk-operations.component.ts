import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface BulkAction {
  id: string;
  label: string;
  icon: string;
  color?: 'primary' | 'accent' | 'warn';
  disabled?: boolean;
}

export interface SelectableItem {
  id: string | number;
  selected: boolean;
  [key: string]: any;
}

@Component({
  selector: 'app-bulk-operations',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  template: `
    <div class="bulk-operations" *ngIf="items.length > 0">
      <!-- Selection Controls -->
      <div class="selection-controls">
        <mat-checkbox
          [checked]="isAllSelected"
          [indeterminate]="isIndeterminate"
          (change)="toggleSelectAll($event.checked)"
          aria-label="Chọn tất cả">
          {{ getSelectionText() }}
        </mat-checkbox>
        
        <div class="bulk-actions" *ngIf="selectedCount > 0">
          <button
            mat-icon-button
            [matMenuTriggerFor]="actionMenu"
            [matTooltip]="'Thao tác hàng loạt'"
            aria-label="Thao tác hàng loạt">
            <mat-icon>more_vert</mat-icon>
          </button>
          
          <mat-menu #actionMenu="matMenu">
            <button
              mat-menu-item
              *ngFor="let action of bulkActions"
              [disabled]="action.disabled"
              (click)="executeAction(action)">
              <mat-icon [color]="action.color">{{ action.icon }}</mat-icon>
              <span>{{ action.label }}</span>
            </button>
          </mat-menu>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="quick-actions" *ngIf="selectedCount > 0">
        <button
          mat-mini-fab
          color="primary"
          (click)="executeQuickAction('delete')"
          matTooltip="Xóa các mục đã chọn">
          <mat-icon>delete</mat-icon>
        </button>
        
        <button
          mat-mini-fab
          color="accent"
          (click)="executeQuickAction('export')"
          matTooltip="Xuất dữ liệu">
          <mat-icon>download</mat-icon>
        </button>
        
        <button
          mat-mini-fab
          color="warn"
          (click)="executeQuickAction('archive')"
          matTooltip="Lưu trữ">
          <mat-icon>archive</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .bulk-operations {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    
    .selection-controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .bulk-actions {
      display: flex;
      align-items: center;
    }
    
    .quick-actions {
      display: flex;
      gap: 8px;
    }
    
    .quick-actions button {
      width: 40px;
      height: 40px;
    }
    
    @media (max-width: 768px) {
      .bulk-operations {
        flex-direction: column;
        gap: 12px;
      }
      
      .selection-controls {
        width: 100%;
        justify-content: space-between;
      }
      
      .quick-actions {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class BulkOperationsComponent implements OnInit {
  @Input() items: SelectableItem[] = [];
  @Input() bulkActions: BulkAction[] = [
    { id: 'delete', label: 'Xóa', icon: 'delete', color: 'warn' },
    { id: 'export', label: 'Xuất Excel', icon: 'download', color: 'primary' },
    { id: 'archive', label: 'Lưu trữ', icon: 'archive', color: 'accent' },
    { id: 'duplicate', label: 'Nhân bản', icon: 'content_copy', color: 'primary' }
  ];
  @Output() actionExecute = new EventEmitter<{ action: string; items: SelectableItem[] }>();
  @Output() selectionChange = new EventEmitter<SelectableItem[]>();
  
  selectedCount = 0;
  isAllSelected = false;
  isIndeterminate = false;
  
  ngOnInit(): void {
    this.updateSelectionState();
  }
  
  ngOnChanges(): void {
    this.updateSelectionState();
  }
  
  private updateSelectionState(): void {
    this.selectedCount = this.items.filter(item => item.selected).length;
    this.isAllSelected = this.selectedCount === this.items.length && this.items.length > 0;
    this.isIndeterminate = this.selectedCount > 0 && this.selectedCount < this.items.length;
  }
  
  toggleSelectAll(checked: boolean): void {
    this.items.forEach(item => item.selected = checked);
    this.updateSelectionState();
    this.selectionChange.emit(this.getSelectedItems());
  }
  
  toggleItemSelection(item: SelectableItem): void {
    item.selected = !item.selected;
    this.updateSelectionState();
    this.selectionChange.emit(this.getSelectedItems());
  }
  
  getSelectedItems(): SelectableItem[] {
    return this.items.filter(item => item.selected);
  }
  
  getSelectionText(): string {
    if (this.selectedCount === 0) {
      return 'Chọn tất cả';
    } else if (this.selectedCount === this.items.length) {
      return `Đã chọn tất cả (${this.selectedCount})`;
    } else {
      return `Đã chọn ${this.selectedCount} mục`;
    }
  }
  
  executeAction(action: BulkAction): void {
    const selectedItems = this.getSelectedItems();
    this.actionExecute.emit({ action: action.id, items: selectedItems });
  }
  
  executeQuickAction(actionId: string): void {
    const selectedItems = this.getSelectedItems();
    this.actionExecute.emit({ action: actionId, items: selectedItems });
  }
} 