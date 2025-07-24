import { createReducer, on } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  
  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(AuthActions.loginSuccess, (state, { token, username, refreshToken, expriedToken }) => ({
    ...state,
    token,
    // Có thể lưu username, refreshToken, expriedToken vào state nếu muốn
    isAuthenticated: true,
    loading: false,
    error: null
  })),
  
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true
  })),
  
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  })),
  
  // Load Profile
  on(AuthActions.loadProfile, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(AuthActions.loadProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  
  on(AuthActions.loadProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Update Profile
  on(AuthActions.updateProfile, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(AuthActions.updateProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  
  on(AuthActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
); 