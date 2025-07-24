import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginOverlayComponent } from './modules/authentication/login/index';
import { RegisterComponent } from './modules/authentication/register/index';
import { LoadingSkeletonComponent } from './shared/components/loading-skeleton';
import { CustomSpinnerComponent } from './shared/components/custom-spinner/custom-spinner.component';
import { DotsSpinnerComponent } from './shared/components/dots-spinner/dots-spinner.component';
import { WaveSpinnerComponent } from './shared/components/wave-spinner/wave-spinner.component';
import { LoadingService } from './core/services/loading.service';
import { AuthService, User } from './modules/authentication/service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    LoginOverlayComponent,
    RegisterComponent,
    LoadingSkeletonComponent,
    CustomSpinnerComponent,
    DotsSpinnerComponent,
    WaveSpinnerComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'CMS Platform';
  showScrollTop = false;
  showLoginOverlay = false;
  showRegisterOverlay = false;
  loadingState: any = { isLoading: false, message: '', type: 'spinner' };
  isAdminPage = false;
  currentUser: User | null = null;
  private loadingSubscription?: Subscription;
  private routerSubscription?: Subscription;
  private authSubscription?: Subscription;

  constructor(
    private loadingService: LoadingService,
    private router: Router,
    private authService: AuthService
  ) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.currentUser = null;
    window.location.href = '/';
  }

  ngOnInit() {
    this.setupScrollListener();
    this.setupLoadingListener();
    this.setupRouterListener();
    this.setupAuthListener();
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
    this.routerSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }

  onWindowScroll() {
    this.showScrollTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onLoginClose() {
    this.showLoginOverlay = false;
  }

  onRegisterClose() {
    this.showRegisterOverlay = false;
  }

  openRegisterFromLogin() {
    this.showLoginOverlay = false;
    this.showRegisterOverlay = true;
  }

  openLoginFromRegister() {
    this.showRegisterOverlay = false;
    this.showLoginOverlay = true;
  }

  onLoginSuccess() {
    // Cập nhật currentUser khi đăng nhập thành công
    this.currentUser = this.authService.getCurrentUser();
    console.log('Login success, current user:', this.currentUser); // Debug log
    console.log('isAuthenticated():', this.authService.isAuthenticated()); // Debug log
    this.showLoginOverlay = false;
  }

  getAvatarText(): string {
    if (!this.currentUser) return 'U';
    
    if (this.currentUser.fullName) {
      return this.currentUser.fullName.charAt(0).toUpperCase();
    }
    
    if (this.currentUser.username) {
      return this.currentUser.username.charAt(0).toUpperCase();
    }
    
    return 'U';
  }

  private setupScrollListener() {
    window.addEventListener('scroll', () => this.onWindowScroll());
  }

  private setupLoadingListener() {
    this.loadingSubscription = this.loadingService.loadingState$.subscribe(
      state => {
        this.loadingState = state;
      }
    );
  }

  private setupRouterListener() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Cập nhật trạng thái admin page để highlight navigation đúng
      this.isAdminPage = event.url.startsWith('/admin');
    });
  }

  private setupAuthListener() {
    // Lắng nghe thay đổi trạng thái đăng nhập
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      console.log('Auth listener - user changed:', user); // Debug log
      this.currentUser = user;
      console.log('Current user in app component:', this.currentUser); // Debug log
    });
  }
} 