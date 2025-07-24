import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'profile',
    loadComponent: () => import('./profile/index').then(m => m.ProfileComponent)
  }
]; 