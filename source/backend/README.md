# CMS Backend - .NET Core 8

Backend API của hệ thống CMS được xây dựng với .NET Core 8, Entity Framework Core và PostgreSQL theo kiến trúc Clean Architecture với Micro-Module pattern.

## 🏗️ Kiến trúc

### Clean Architecture với Micro-Module Pattern
```
CMS.Application/          # Presentation Layer (Controllers, API)
├── Modules/             # Micro-Modules
│   ├── Authentication/  # Auth Module
│   ├── Home/           # Home Module  
│   └── Materials/      # Materials Module
CMS.Core/                # Domain Layer (Entities, Interfaces)
CMS.Infrastructure/      # Infrastructure Layer (EF Core, Repositories)
CMS.Common/              # Shared Utilities (JWT, Password Hashing)
```

### Micro-Module Structure
Mỗi module có cấu trúc chuẩn:
```
ModuleName/
├── Controllers/         # API Controllers
├── Handlers/           # Command Handlers (MediatR)
├── Queries/            # Query Classes (CQRS)
├── Services/           # Business Services
└── DTOs/              # Data Transfer Objects
    ├── Requests/       # Request DTOs
    └── Responses/      # Response DTOs
```

## 🔄 Pipe Flow Code Chuẩn

### 1. **Query Pattern** (GET Operations)
- Interface và Implementation trong cùng file
- Sử dụng IEntityRepository cho data access
- Controller gọi Query và wrap response trong ApiResponse<T>
- Handle null response với NotFound()

### 2. **Command Pattern** (POST/PUT/DELETE Operations)
- Request DTO implement IRequest<T>
- Handler implement IRequestHandler<Request, Response>
- Sử dụng IEntityRepository cho data access
- Controller sử dụng MediatR.Send() và wrap response

### 3. **Service Pattern** (Business Logic)
- Interface và Implementation trong cùng file
- Inject dependencies qua constructor
- Auto-register qua CommonConfig
- Sử dụng cho business logic phức tạp

### 4. **Repository Pattern** (Data Access)
- Generic IEntityRepository<T> interface
- Generic EntityRepository<T> implementation
- Auto-register qua CommonConfig
- Support FindAsync, List, Insert, Update, Delete operations

## 🎯 Module Development Guidelines

### Khi tạo module mới:

1. **Tạo cấu trúc thư mục**:
   - Controllers/ (API endpoints)
   - Handlers/ (Command handlers)
   - Queries/ (Query classes)
   - Services/ (Business services - nếu cần)
   - DTOs/Requests/ (Request DTOs)
   - DTOs/Responses/ (Response DTOs)

2. **Implement Query Pattern** (cho GET operations):
   - Tạo interface và implementation trong cùng file
   - Inject IEntityRepository<T> qua constructor
   - Implement business logic cho data retrieval
   - Return response DTO hoặc null

3. **Implement Command Pattern** (cho POST/PUT/DELETE operations):
   - Tạo Request DTO implement IRequest<T>
   - Tạo Handler implement IRequestHandler<Request, Response>
   - Inject IEntityRepository<T> qua constructor
   - Implement business logic cho data manipulation
   - Return response DTO

4. **Create Controller**:
   - Inject IMediator và IQuery qua constructor
   - GET endpoints gọi Query
   - POST/PUT/DELETE endpoints gọi MediatR.Send()
   - Wrap response trong ApiResponse<T>
   - Handle null responses với NotFound()

5. **Create DTOs**:
   - Request DTOs cho input parameters
   - Response DTOs cho output data
   - Sử dụng Data Annotations cho validation
   - Implement IRequest<T> cho Command DTOs

### Best Practices cho Module Development:

1. **Naming Conventions**:
   - Module name: PascalCase
   - Controller: {ModuleName}Controller
   - Query: {ModuleName}Query
   - Handler: {Action}{Entity}Handler

2. **File Organization**:
   - Interface và Implementation trong cùng file
   - DTOs tách riêng Requests và Responses
   - Controllers chỉ chứa routing logic

3. **Dependency Injection**:
   - Auto-registration qua CommonConfig
   - Constructor injection cho dependencies
   - Scoped lifetime cho repositories

4. **Error Handling**:
   - Không dùng try-catch trong controllers
   - Sử dụng ExceptionHandlingMiddleware
   - Proper HTTP status codes

5. **API Design**:
   - RESTful endpoints
   - Consistent response format với ApiResponse<T>
   - Proper validation với Data Annotations

## 🛠️ Cài đặt và chạy

### Yêu cầu hệ thống
- .NET 8 SDK
- PostgreSQL 12+
- Visual Studio 2022 hoặc VS Code

### Dependency Injection
- Auto-register Handlers, Services, Queries qua CommonConfig
- Register MediatR cho Command/Query handlers
- Register UnitOfWork cho transaction management
- Register Repository pattern cho data access

### CORS Policy
- AllowAnyOrigin, AllowAnyMethod, AllowAnyHeader cho development
- Configure specific origins cho production

## 📊 Performance

### Optimizations
- Entity Framework Core query optimization
- Repository pattern với lazy loading
- JWT token caching
- Database indexing
- CQRS pattern cho tách biệt read/write operations

### Monitoring
- Application insights
- Health checks
- Performance counters

## 🔒 Security

### Authentication & Authorization
- JWT Bearer token authentication
- Role-based authorization
- Password hashing với BCrypt
- Account lockout mechanism

### Data Protection
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection

## 📈 Scalability
### Docker
- Multi-stage build với .NET 8
- Base image: mcr.microsoft.com/dotnet/aspnet:8.0
- Build image: mcr.microsoft.com/dotnet/sdk:8.0
- Copy project files và restore dependencies
- Build và publish application
- Expose ports 80 và 443

### Environment Variables
```bash
# Production
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection=your_production_connection_string
JwtSettings__SecretKey=your_production_secret_key
```
## 📄 License