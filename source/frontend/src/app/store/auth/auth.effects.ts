import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../modules/authentication/service';
import { ToastService } from '../../core/services/toast.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastService: ToastService,
    private store: Store
  ) {}
  
  // Login Effect
  login$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login({ username, password }).pipe(
          map(response => {
            if (response.statusCode === 200) {
              this.authService.setAuthData(response.data); // chỉ truyền response.data
              this.toastService.success('Đăng nhập thành công');
              // Dispatch loginSuccess và loadProfile
              return AuthActions.loginSuccess({ 
                token: response.data.token,
                username: response.data.username,
                refreshToken: response.data.refreshToken,
                expriedToken: response.data.expriedToken
              });
            } else {
              return AuthActions.loginFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastService.error('Đăng nhập thất bại: ' + error.message);
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        )
      )
    )
  );
  
  // Load Profile Effect
  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadProfile),
      mergeMap(() =>
        this.authService.getProfile().pipe(
          map(response => {
            if (response.statusCode === 200) {
              return AuthActions.loadProfileSuccess({ user: response.data });
            } else {
              return AuthActions.loadProfileFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastService.error('Không thể tải thông tin profile: ' + error.message);
            return of(AuthActions.loadProfileFailure({ error: error.message }));
          })
        )
      )
    )
  );
  
  // Update Profile Effect
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateProfile),
      mergeMap(({ user }) =>
        this.authService.updateProfile(user).pipe(
          map(response => {
            if (response.statusCode === 200) {
              this.toastService.success('Cập nhật profile thành công');
              return AuthActions.updateProfileSuccess({ user: response.data });
            } else {
              return AuthActions.updateProfileFailure({ error: response.message });
            }
          }),
          catchError(error => {
            this.toastService.error('Cập nhật profile thất bại: ' + error.message);
            return of(AuthActions.updateProfileFailure({ error: error.message }));
          })
        )
      )
    )
  );
  
  // Logout Effect
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
        this.toastService.info('Đã đăng xuất');
      }),
      map(() => AuthActions.logoutSuccess())
    )
  );
  
  // Auto Login Effect (check token on app start)
  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadProfile),
      mergeMap(() => {
        const token = this.authService.getToken();
        if (token) {
          return this.authService.getProfile().pipe(
            map(response => {
              if (response.statusCode === 200) {
                return AuthActions.loadProfileSuccess({ user: response.data });
              } else {
                this.authService.logout();
                return AuthActions.loadProfileFailure({ error: 'Token không hợp lệ' });
              }
            }),
            catchError(() => {
              this.authService.logout();
              return of(AuthActions.loadProfileFailure({ error: 'Token không hợp lệ' }));
            })
          );
        } else {
          return of(AuthActions.loadProfileFailure({ error: 'Không có token' }));
        }
      })
    )
  );
} 