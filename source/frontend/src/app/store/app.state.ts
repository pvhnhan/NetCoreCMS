import { User } from '../core/models/user.model';

export interface AppState {
  auth: AuthState;
  ui: UIState;
  materials: MaterialsState;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface UIState {
  loading: boolean;
  sidebarOpen: boolean;
  notifications: Notification[];
}

export interface MaterialsState {
  categoryTypes: any[];
  loading: boolean;
  error: string | null;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
} 