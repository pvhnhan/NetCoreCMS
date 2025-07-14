namespace CMS.Application.Modules.Authentication.DTOs.Responses;

public class UserProfileResponse
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateTime? LastLoginAt { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string? Avatar { get; set; }
} 