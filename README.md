# CMS Platform - .NET Core 8 & Angular 17

Hệ thống quản lý nội dung (CMS) hiện đại được xây dựng với .NET Core 8 và Angular 17 theo kiến trúc microservice và micro-module.

## 🏗️ Kiến trúc tổng thể

```
cms/
├── source/
│   ├── backend/              # .NET Core 8 Backend
│   │   ├── CMS.Application/  # Web API
│   │   ├── CMS.Core/         # Domain Layer
│   │   ├── CMS.Infrastructure/ # Data Access
│   │   └── CMS.Common/       # Shared Utilities
│   └── frontend/             # Angular 17 Frontend
│       └── src/
│           └── app/
│               ├── core/      # Core functionality
│               ├── modules/   # Feature modules
│               └── shared/    # Shared components
├── docker/                   # Docker configurations
├── docker-compose.yml        # Multi-container setup
└── README.md                 # Documentation
```

## 🚀 Công nghệ sử dụng

### Backend (.NET Core 8)
- **Framework**: .NET Core 8
- **ORM**: Entity Framework Core 8
- **Database**: PostgreSQL
- **Authentication**: JWT Bearer
- **Password Hashing**: BCrypt
- **API Documentation**: Swagger

### Frontend (Angular 17)
- **Framework**: Angular CLI 17.3+
- **Language**: TypeScript 5.2.2
- **UI Framework**: Bootstrap 5.3.0
- **Icons**: Font Awesome 6.4.0
- **State Management**: RxJS 7.8.0

### DevOps & Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Version Control**: Git
- **CI/CD**: GitHub Actions (có thể thêm)

## 📁 Cấu trúc dự án chi tiết

### Backend Microservices
```
backend/
├── CMS.Application/           # Presentation Layer
│   ├── Controllers/          # API Controllers
│   ├── Program.cs           # Startup configuration
│   └── appsettings.json     # Configuration
├── CMS.Core/                # Domain Layer
│   ├── Entities/            # Domain entities
│   │   ├── BaseEntity.cs
│   │   ├── User.cs
│   │   ├── SystemInfo.cs
│   │   ├── Menu.cs
│   │   └── Banner.cs
│   └── Interfaces/          # Repository interfaces
│       ├── IRepository.cs
│       └── IUnitOfWork.cs
├── CMS.Infrastructure/      # Infrastructure Layer
│   ├── Data/               # DbContext
│   │   └── CmsDbContext.cs
│   └── Repositories/       # Repository implementations
│       ├── Repository.cs
│       └── UnitOfWork.cs
└── CMS.Common/             # Shared Utilities
    └── Utilities/          # Helper classes
        ├── PasswordHasher.cs
        └── JwtHelper.cs
```

### Frontend Micro-modules
```
frontend/
├── src/
│   ├── app/
│   │   ├── core/           # Core functionality
│   │   │   ├── models/     # TypeScript interfaces
│   │   │   ├── services/   # Shared services
│   │   │   └── interceptors/ # HTTP interceptors
│   │   ├── modules/        # Feature modules
│   │   │   ├── authentication/ # Auth module
│   │   │   ├── home/       # Home module
│   │   │   └── admin/      # Admin modules
│   │   ├── shared/         # Shared components
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── package.json
├── angular.json
└── tsconfig.json
```

## 🛠️ Cài đặt và chạy

### Yêu cầu hệ thống
- .NET 8 SDK
- Node.js 18+
- PostgreSQL 12+
- Docker & Docker Compose

### Cài đặt nhanh với Docker
```bash
# Clone repository
git clone https://github.com/your-username/cms-platform.git
cd cms-platform

# Chạy với Docker Compose
docker-compose up -d

# Truy cập ứng dụng
# Backend API: http://localhost:7000
# Frontend: http://localhost:4200
# Swagger: http://localhost:7000/swagger
```

### Cài đặt thủ công

#### Backend
```bash
cd source/backend

# Restore packages
dotnet restore

# Build project
dotnet build

# Chạy migrations
dotnet ef database update --project CMS.Infrastructure --startup-project CMS.Application

# Chạy API
dotnet run --project CMS.Application
```

#### Frontend
```bash
cd source/frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm start
```

## 🔐 Authentication & Authorization

### JWT Configuration
```json
{
  "JwtSettings": {
    "SecretKey": "your-super-secret-key-with-at-least-32-characters",
    "Issuer": "CMS",
    "Audience": "CMS",
    "ExpirationInMinutes": 60
  }
}
```

### User Roles
- **Admin**: Quản trị toàn bộ hệ thống
- **Manager**: Quản lý nội dung
- **Editor**: Chỉnh sửa nội dung
- **User**: Xem nội dung

## 📊 Database Schema

### Core Tables
- **Users**: Quản lý người dùng
- **SystemInfo**: Cấu hình hệ thống
- **Menus**: Quản lý menu
- **Banners**: Quản lý banner

### Relationships
- Users có thể có nhiều roles
- Menus có thể có parent-child relationships
- Banners có thể có nhiều positions

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `GET /api/auth/profile` - Lấy thông tin profile

### Admin APIs
- `GET /api/admin/system-info` - Thông tin hệ thống
- `GET /api/admin/menus` - Quản lý menu
- `GET /api/admin/banners` - Quản lý banner

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Bootstrap 5 grid system
- Custom CSS animations

### Components
- Navigation với dropdown
- Forms với validation
- Cards với hover effects
- Tables với sorting
- Modals và alerts

## 🔒 Security Features

### Backend Security
- JWT token authentication
- BCrypt password hashing
- CORS configuration
- Input validation
- SQL injection prevention

### Frontend Security
- Token storage trong localStorage
- Automatic token injection
- Route guards
- XSS prevention

## 📊 Performance Optimizations

### Backend
- Entity Framework Core query optimization
- Repository pattern với lazy loading
- JWT token caching
- Database indexing

### Frontend
- Standalone components
- Lazy loading modules
- Tree shaking
- Code splitting

## 🧪 Testing

### Backend Testing
```bash
dotnet test
```

### Frontend Testing
```bash
npm test
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build và chạy
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

### Production Deployment
```bash
# Backend
dotnet publish -c Release
docker build -t cms-backend .

# Frontend
npm run build
docker build -t cms-frontend .
```

## 📚 Documentation

### API Documentation
- Swagger UI: `http://localhost:7000/swagger`
- Postman Collection: `CMS-API.postman_collection.json`

### Code Documentation
- Backend: XML documentation
- Frontend: JSDoc comments
- TypeScript interfaces

## 🤝 Contributing

### Development Workflow
1. Fork repository
2. Create feature branch
3. Make changes
4. Run tests
5. Submit pull request

### Code Standards
- C# coding conventions
- TypeScript strict mode
- Angular best practices
- Vietnamese comments

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 🆘 Support

### Issues
- Bug reports
- Feature requests
- Performance issues

### Contact
- Email: support@cms-platform.com
- Documentation: https://docs.cms-platform.com
- Community: https://community.cms-platform.com

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic authentication
- ✅ User management
- ✅ Menu management
- ✅ Banner management

### Phase 2 (Next)
- 🔄 Content management
- 🔄 File upload system
- 🔄 Advanced permissions
- 🔄 Audit logging

### Phase 3 (Future)
- 📋 Multi-tenant support
- 📋 API rate limiting
- 📋 Real-time notifications
- �� Advanced analytics 