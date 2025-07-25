import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  styleUrls: ['./style.scss'],
  template: `
    <div class="admin-layout">
      <!-- Sidebar -->
      <aside class="admin-sidebar" [class.collapsed]="isSidebarCollapsed">
        <div class="sidebar-header d-flex align-items-center justify-content-between">
          <div class="sidebar-brand" *ngIf="!isSidebarCollapsed">MENU QUẢN TRỊ</div>
          <button class="sidebar-toggle" (click)="isSidebarCollapsed = !isSidebarCollapsed">
            <mat-icon>{{ isSidebarCollapsed ? 'chevron_right' : 'chevron_left' }}</mat-icon>
          </button>
        </div>
        <nav class="sidebar-menu">
          <ul>
            <li class="sidebar-dashboard">
              <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="sidebar-link">
                <mat-icon *ngIf="isSidebarCollapsed">dashboard</mat-icon>
                <span *ngIf="!isSidebarCollapsed">ADMIN DASHBOARD</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/category-type" routerLinkActive="active" class="sidebar-link">
                <mat-icon>category</mat-icon>
                <span *ngIf="!isSidebarCollapsed">Quản lý danh mục</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/banner" routerLinkActive="active" class="sidebar-link">
                <mat-icon>photo</mat-icon>
                <span *ngIf="!isSidebarCollapsed">Quản lý banner</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/menu" routerLinkActive="active" class="sidebar-link">
                <mat-icon>menu</mat-icon>
                <span *ngIf="!isSidebarCollapsed">Quản lý menu</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/system-info" routerLinkActive="active" class="sidebar-link">
                <mat-icon>info</mat-icon>
                <span *ngIf="!isSidebarCollapsed">Thông tin hệ thống</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <!-- Content Area -->
      <main class="admin-content w-100 px-4" [class.sidebar-collapsed]="isSidebarCollapsed">
        <div class="admin-content-card">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class AdminLayoutComponent {
  isSidebarCollapsed: boolean = false;
} 