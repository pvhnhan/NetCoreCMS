import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/dashboard-layout/index').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/index').then(m => m.AdminDashboardComponent)
      }
    ]
  },
  {
    path: 'category-type',
    loadComponent: () => import('./layouts/admin-layout/index').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./category-type/index').then(m => m.CategoryTypeComponent)
      }
    ]
  },
  {
    path: 'banner',
    loadComponent: () => import('./layouts/admin-layout/index').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./banner/index').then(m => m.BannerComponent)
      }
    ]
  },
  {
    path: 'menu',
    loadComponent: () => import('./layouts/admin-layout/index').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./menu/index').then(m => m.MenuComponent)
      }
    ]
  },
  {
    path: 'system-info',
    loadComponent: () => import('./layouts/admin-layout/index').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./system-info/index').then(m => m.SystemInfoComponent)
      }
    ]
  }
]; 