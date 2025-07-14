using System.ComponentModel.DataAnnotations;

namespace CMS.Core.Entities;

/// <summary>
/// Entity User
/// </summary>
public class User : BaseEntity
{
    [Required]
    [StringLength(50)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(100)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(200)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [StringLength(20)]
    public string Role { get; set; } = "User";

    public bool IsActive { get; set; } = true;

    public int FailedLoginAttempts { get; set; } = 0;

    public DateTime? LockedUntil { get; set; }

    public DateTime? LastLoginAt { get; set; }

    public string? Avatar { get; set; } // Đường dẫn hoặc base64 avatar
} 