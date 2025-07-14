using Microsoft.EntityFrameworkCore;
using CMS.Infrastructure.Data;
using CMS.Core.Interfaces;
using CMS.Infrastructure.Repositories;
using CMS.Common.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CMS.Application.Configs;
using System.Reflection;
using CMS.Common.Settings;
using CMS.Application.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var services = builder.Services;

services.AddControllersWithViews();
services.AddRouting(options =>
{
    options.LowercaseUrls = true;
    options.LowercaseQueryStrings = true;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database configuration
builder.Services.AddDbContext<CmsDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repository pattern
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

// JWT Configuration
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings?.SecretKey ?? "your-secret-key-here")),
            ValidateIssuer = true,
            ValidIssuer = jwtSettings?.Issuer ?? "your-issuer",
            ValidateAudience = true,
            ValidAudience = jwtSettings?.Audience ?? "your-audience",
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Đăng ký DI tự động cho Handler, Service, Query, MediatR, UnitOfWork
builder.Services.AddCommonServices(new[] { Assembly.GetExecutingAssembly(), typeof(IUnitOfWork).Assembly });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseMiddleware<CMS.Application.Middleware.ExceptionHandlingMiddleware>();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();


// Migration database
app.MigrateDbContext<CmsDbContext>((context, services) => { });

using (var scope = app.Services.CreateScope())
{    
    var dataContext = scope.ServiceProvider.GetRequiredService<CmsDbContext>();
    dataContext.Database.Migrate();

    // Seeder
    AccountSeeder.Seed(dataContext);
}

app.MapControllers();

app.Run();
