using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using CMS.Core.Interfaces;
using CMS.Core.Entities;
using CMS.Common.Interfaces.Repositories;
using System.Security.Claims;

namespace CMS.Application.Infrastructure.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class PrivilegeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string[] _allowedRoles;

        public PrivilegeAttribute(params string[] allowedRoles)
        {
            _allowedRoles = allowedRoles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;
            
            if (!user.Identity?.IsAuthenticated ?? true)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // Lấy user ID từ JWT token
            var userIdClaim = user.FindFirst("UserId")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var userId))
            {
                context.Result = new ForbidResult();
                return;
            }

            // Truy vấn trực tiếp từ DB để lấy role
            var userRepository = context.HttpContext.RequestServices.GetRequiredService<IEntityRepository<User>>();
            var userEntity = userRepository.FindAsync(u => u.Id == userId && u.IsActive).Result;
            
            if (userEntity == null)
            {
                context.Result = new ForbidResult();
                return;
            }

            // Kiểm tra role
            if (!_allowedRoles.Contains(userEntity.Role, StringComparer.OrdinalIgnoreCase))
            {
                context.Result = new ForbidResult();
                return;
            }
        }
    }
}
