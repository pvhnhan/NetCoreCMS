# CMS Backend - .NET Core 8

Backend API của hệ thống CMS được xây dựng với .NET Core 8, Entity Framework Core và PostgreSQL theo kiến trúc Clean Architecture.

## 🏗️ Kiến trúc

### Clean Architecture
```
CMS.Application/          # Presentation Layer (Controllers, API)
CMS.Core/                # Domain Layer (Entities, Interfaces)
CMS.Infrastructure/      # Infrastructure Layer (EF Core, Repositories)
CMS.Common/              # Shared Utilities (JWT, Password Hashing)
```

### Microservices Structure
- **CMS.Application**: Web API với controllers
- **CMS.Core**: Domain entities và interfaces
- **CMS.Infrastructure**: Data access và repositories
- **CMS.Common**: Shared utilities và helpers

## 🚀 Công nghệ sử dụng

- **.NET Core 8**: Framework chính
- **Entity Framework Core 8**: ORM
- **PostgreSQL**: Database
- **JWT Bearer**: Authentication
- **BCrypt**: Password hashing
- **Swagger**: API documentation

## 📁 Cấu trúc dự án

```
backend/
├── CMS.Application/           # Web API Project
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
├── CMS.Infrastructure/      # Data Access Layer
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

## 🛠️ Cài đặt và chạy

### Yêu cầu hệ thống
- .NET 8 SDK
- PostgreSQL 12+
- Visual Studio 2022 hoặc VS Code

### Cài đặt database
```bash
# Tạo database
createdb cms_db

# Chạy migrations
dotnet ef database update
```

### Chạy ứng dụng
```bash
# Restore packages
dotnet restore

# Build project
dotnet build

# Chạy development server
dotnet run --project CMS.Application
```

API sẽ chạy tại `https://localhost:7000`

## 🔐 Authentication

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

### API Endpoints

#### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `GET /api/auth/profile` - Lấy thông tin profile

#### Admin APIs (cần authentication)
- `GET /api/admin/system-info` - Thông tin hệ thống
- `GET /api/admin/menus` - Quản lý menu
- `GET /api/admin/banners` - Quản lý banner

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role VARCHAR(20) NOT NULL DEFAULT 'User',
    IsActive BOOLEAN NOT NULL DEFAULT true,
    LastLoginAt TIMESTAMP,
    FailedLoginAttempts INTEGER DEFAULT 0,
    LockedUntil TIMESTAMP,
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    UpdatedAt TIMESTAMP
);
```

### SystemInfo Table
```sql
CREATE TABLE SystemInfos (
    Id SERIAL PRIMARY KEY,
    SystemName VARCHAR(100) NOT NULL,
    Version VARCHAR(20) NOT NULL,
    Description TEXT,
    ContactEmail VARCHAR(100),
    ContactPhone VARCHAR(20),
    Website VARCHAR(200),
    LogoUrl VARCHAR(500),
    FaviconUrl VARCHAR(500),
    SmtpServer VARCHAR(100),
    SmtpPort INTEGER,
    SmtpEmail VARCHAR(100),
    SmtpPassword VARCHAR(100),
    SecuritySettings TEXT,
    AdditionalSettings TEXT,
    IsActive BOOLEAN NOT NULL DEFAULT true,
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    UpdatedAt TIMESTAMP
);
```

### Menus Table
```sql
CREATE TABLE Menus (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Url VARCHAR(200),
    Icon VARCHAR(50),
    "Order" INTEGER DEFAULT 0,
    ParentId INTEGER REFERENCES Menus(Id),
    Position VARCHAR(20) NOT NULL DEFAULT 'Header',
    OpenInNewTab BOOLEAN DEFAULT false,
    AllowedRoles VARCHAR(50),
    IsActive BOOLEAN NOT NULL DEFAULT true,
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    UpdatedAt TIMESTAMP
);
```

### Banners Table
```sql
CREATE TABLE Banners (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    ImageUrl VARCHAR(500) NOT NULL,
    LinkUrl VARCHAR(500),
    Position VARCHAR(20) NOT NULL DEFAULT 'Home',
    "Order" INTEGER DEFAULT 0,
    StartDate TIMESTAMP,
    EndDate TIMESTAMP,
    OpenInNewTab BOOLEAN DEFAULT false,
    AltText VARCHAR(200),
    Title VARCHAR(200),
    CssClass VARCHAR(100),
    IsActive BOOLEAN NOT NULL DEFAULT true,
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    UpdatedAt TIMESTAMP
);
```

## 🔧 Configuration

### Connection String
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=cms_db;Username=postgres;Password=postgres"
  }
}
```

### CORS Policy
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

## 🧪 Testing

### Unit Tests
```bash
dotnet test
```

### Integration Tests
```bash
dotnet test --filter Category=Integration
```

## 📊 Performance

### Optimizations
- Entity Framework Core query optimization
- Repository pattern với lazy loading
- JWT token caching
- Database indexing

### Monitoring
- Application insights
- Health checks
- Performance counters

## 🔒 Security

### Password Security
- BCrypt hashing với salt
- Password strength validation
- Account lockout mechanism

### JWT Security
- Token expiration
- Secure token storage
- Refresh token mechanism

### API Security
- CORS configuration
- Input validation
- SQL injection prevention

## 🚀 Deployment

### Docker
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
COPY bin/Release/net8.0/publish/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "CMS.Application.dll"]
```

### Environment Variables
```bash
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection=your-connection-string
JwtSettings__SecretKey=your-secret-key
```

## 📚 API Documentation

### Swagger UI
Truy cập `https://localhost:7000/swagger` để xem API documentation.

### Postman Collection
Import file `CMS-API.postman_collection.json` vào Postman.

## 🤝 Contributing

### Development Workflow
1. Fork repository
2. Create feature branch
3. Make changes
4. Run tests
5. Submit pull request

### Code Standards
- C# coding conventions
- XML documentation
- Unit test coverage
- Code review process

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