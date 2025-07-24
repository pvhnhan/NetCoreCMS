# CMS Frontend - Angular 17

## 📁 Project Structure

### Cấu trúc thư mục chính

```
src/app/
├── app.component.ts          # Root component
├── app.config.ts            # App configuration
├── app.routes.ts            # Main routing
├── core/                    # Core services & models
│   ├── interceptors/        # HTTP interceptors
│   ├── models/             # Data models
│   └── services/           # Core services
├── modules/                 # Feature modules
│   ├── authentication/      # Auth module
│   ├── admin/              # Admin module
│   └── home/               # Home module
├── shared/                  # Shared components
│   ├── components/         # Reusable components
│   ├── directives/         # Custom directives
│   ├── services/           # Shared services
│   └── material.module.ts  # Material modules
└── assets/                 # Static assets
```

### Cấu trúc Module Pattern

Mỗi module tuân theo pattern thống nhất:

```
modules/
├── module-name/
│   ├── routes.ts           # Module routes
│   ├── component-name/
│   │   ├── index.ts        # Component logic
│   │   ├── index.html      # Component template
│   │   └── style.scss      # Component styles
│   └── another-component/
│       ├── index.ts
│       ├── index.html
│       └── style.scss
```

## 🎨 Design System

### Material Design Integration
- Sử dụng Angular Material 17.x
- Custom theme với màu sắc nội thất trường học
- Responsive design cho mọi thiết bị

### SCSS Architecture
- BEM methodology cho CSS classes
- Optimized SCSS files (dưới 4KB budget)
- Mixins và variables cho consistency
- Responsive breakpoints

### Component Structure
```typescript
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [/* Material modules */],
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})
export class ComponentName {
  // Component logic
}
```

## 🚀 Environment Configuration

### Cấu trúc Environment Files

```
src/environments/
├── environment.ts          # Development environment
└── environment.prod.ts    # Production environment
```

### Environment Variables

#### Development (environment.ts)
```typescript
{
  production: false,
  apiDomain: 'localhost',
  apiPort: '7233',
  apiProtocol: 'https',
  apiUrl: 'https://localhost:7233/api'
}
```

#### Production (environment.prod.ts)
```typescript
{
  production: true,
  apiDomain: 'your-production-domain.com',
  apiPort: '443',
  apiProtocol: 'https',
  apiUrl: 'https://your-production-domain.com/api'
}
```

### Build Commands

```bash
# Development
npm run build:dev
# hoặc
ng build --configuration development

# Production  
npm run build:prod
# hoặc
ng build --configuration production

# Serve Development
npm run start:dev
# hoặc
ng serve --configuration development

# Serve Production
npm run start:prod
# hoặc
ng serve --configuration production
```

## 🔧 Development

### Prerequisites
```bash
# Node.js 18+ và npm
node --version
npm --version

# Angular CLI
npm install -g @angular/cli
```

### Setup & Run
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for development
npm run build:dev
```

### Code Style Guidelines

#### File Naming Convention
- **Components**: `index.ts`, `index.html`, `style.scss`
- **Routes**: `routes.ts` cho mỗi module
- **Services**: `service-name.service.ts`
- **Models**: `model-name.model.ts`

#### Component Structure
```typescript
// index.ts
@Component({
  selector: 'app-component-name',
  templateUrl: './index.html',
  styleUrls: ['./style.scss']
})

// index.html
<div class="component-name">
  <!-- Template content -->
</div>

// style.scss
.component-name {
  // BEM structure
  &__element {
    // Element styles
  }
  
  &--modifier {
    // Modifier styles
  }
}
```

## 🏗️ Architecture Patterns

### Module Pattern
- **Feature-based modules**: Mỗi tính năng là một module riêng
- **Lazy loading**: Tất cả modules được lazy load
- **Standalone components**: Sử dụng Angular standalone components

### Service Pattern
```typescript
// Base API Service
export abstract class BaseApiService {
  protected baseUrl = environment.apiUrl;
  
  constructor(protected http: HttpClient) {}
  
  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }
}

// Feature Service
export class CategoryTypeService extends BaseApiService {
  getCategoryTypes(): Observable<ApiResponse<CategoryType[]>> {
    return this.get<ApiResponse<CategoryType[]>>('/category-types');
  }
}
```

### Routing Pattern
```typescript
// Module routes
export const MODULE_ROUTES: Routes = [
  {
    path: 'component',
    loadComponent: () => import('./component/index').then(m => m.ComponentName)
  }
];

// Main app routes
export const routes: Routes = [
  {
    path: 'module',
    loadChildren: () => import('./modules/module/routes').then(m => m.MODULE_ROUTES)
  }
];
```

### Budget Constraints
- **SCSS files**: Tối đa 4KB mỗi file
- **Component files**: Tối ưu hóa kích thước
- **Bundle size**: Monitoring và optimization

## 📚 Dependencies

### Core Dependencies
- Angular 17.x
- Angular Material 17.x
- RxJS 7.x
- TypeScript 5.x

### Development Dependencies
- Angular CLI
- ESLint
- Prettier
- Karma & Jasmine

## 🚀 Deployment

### Environment Detection
- **Development**: `environment.production = false`
- **Production**: `environment.production = true`

Angular CLI tự động detect và sử dụng đúng environment file dựa trên configuration trong `angular.json`. 