namespace CMS.Application.Modules.Authentication.DTOs.Responses;

public class LoginResponse
{
    public string Token { get; set; } = string.Empty;
    public string? RefreshToken { get; set; }
    public DateTime? ExpriedToken { get; set; }
    public string? Message { get; set; }
} 