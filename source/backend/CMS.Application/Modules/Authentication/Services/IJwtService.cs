using CMS.Core.Entities;
using System.Security.Claims;

namespace CMS.Application.Modules.Authentication.Services;

public interface IJwtService
{
    string GenerateToken(User user);
    ClaimsPrincipal? ValidateToken(string token);
    int? GetUserIdFromToken(string token);
    string? GetUsernameFromToken(string token);
    string? GetRoleFromToken(string token);
} 