using Microsoft.Extensions.DependencyInjection;
using NetCore.AutoRegisterDi;
using System.Reflection;
using CMS.Core.Interfaces;
using CMS.Infrastructure.Repositories;
using MediatR;

namespace CMS.Application.Configs;

public static class CommonConfig
{
    public static void AddCommonServices(this IServiceCollection services, Assembly[] assemblies)
    {
        // Đăng ký tự động các class kết thúc bằng Handler, Service, Query
        services.RegisterAssemblyPublicNonGenericClasses(assemblies)
            .Where(c => c.Name.EndsWith("Handler") || c.Name.EndsWith("Service") || c.Name.EndsWith("Query"))
            .AsPublicImplementedInterfaces();

        // Đăng ký MediatR cho toàn bộ assembly
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(assemblies));

        // Đăng ký UnitOfWork
        services.AddScoped<IUnitOfWork, UnitOfWork>();
    }
} 