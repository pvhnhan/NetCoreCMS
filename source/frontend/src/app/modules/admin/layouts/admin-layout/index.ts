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
      <aside class="admin-sidebar">
        <div class="sidebar-header">
          <div class="sidebar-brand text-white">QUẢN TRỊ DỮ LIỆU</div>
        </div>
        <nav class="sidebar-menu">
          <ul>
            <li class="sidebar-dashboard">
              <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">                
                <span class="dashboard-title">ADMIN DASHBOARD</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/category-type" routerLinkActive="active">
                <mat-icon>category</mat-icon>
                <span>Quản lý danh mục</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/banner" routerLinkActive="active">
                <mat-icon>image</mat-icon>
                <span>Quản lý banner</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/menu" routerLinkActive="active">
                <mat-icon>menu</mat-icon>
                <span>Quản lý menu</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/system-info" routerLinkActive="active">
                <mat-icon>info</mat-icon>
                <span>Thông tin hệ thống</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <!-- Content Area -->
      <main class="admin-content w-100 px-4">
        <div class="admin-content-card">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class AdminLayoutComponent {} 