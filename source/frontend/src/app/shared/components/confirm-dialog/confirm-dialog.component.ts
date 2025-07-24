import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <style>
      .confirm-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        padding: 1.2rem 1.5rem 0 1.5rem;
        border-top: 1px solid #eee;
        background: #fff;
        border-radius: 0 0 1.25rem 1.25rem;
      }
      .confirm-btn {
        min-width: 110px;
        border-radius: 2rem;
        font-size: 1.08rem;
        font-weight: 600;
        padding: 0.65rem 1.5rem;
        border: none;
        cursor: pointer;
        transition: background 0.18s, color 0.18s, box-shadow 0.18s;
      }
      .confirm-btn.cancel {
        background: #f5f5f5;
        color: #555;
        border: 1px solid #ddd;
      }
      .confirm-btn.cancel:hover {
        background: #ececec;
        color: #8B4513;
      }
      .confirm-btn.confirm {
        background: linear-gradient(90deg, #8B4513 0%, #C19A6B 100%);
        color: #fff;
        border: none;
      }
      .confirm-btn.confirm:hover {
        background: linear-gradient(90deg, #C19A6B 0%, #8B4513 100%);
        color: #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.12);
      }
    </style>
    <div class="app-modal-container" style="max-width: 340px;">
      <div class="app-modal-header" style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem 1rem 0.75rem 1rem;">
        <span style="display: flex; align-items: center; justify-content: center; background: #FFF3E0; border-radius: 50%; width: 36px; height: 36px;">
          <span class="material-icons" style="font-size: 1.7rem; color: #FFA000;">warning_amber</span>
        </span>
        <div style="flex:1; display: flex; align-items: center;">
          <h2 style="margin:0; font-size: 1.08rem; font-weight: 700; color: #8B4513; line-height: 1.2;">{{ data.title || 'Xác nhận' }}</h2>
        </div>
      </div>
      <div style="padding: 0.75rem 1rem 0.5rem 1rem; text-align: center; color: #444; font-size: 1.05rem; word-break: break-word;">
        {{ data.message }}
      </div>
      <div class="confirm-modal-footer mt-4">
        <button type="button" class="confirm-btn cancel" (click)="onNo()">Hủy</button>
        <button type="button" class="confirm-btn confirm" (click)="onYes()">Đồng ý</button>
      </div>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title?: string; message?: string }
  ) {}
  onNo() { this.dialogRef.close(false); }
  onYes() { this.dialogRef.close(true); }
} 