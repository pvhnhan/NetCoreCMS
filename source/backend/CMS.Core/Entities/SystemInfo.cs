using System.ComponentModel.DataAnnotations;

namespace CMS.Core.Entities;

/// <summary>
/// Entity SystemInfo
/// </summary>
public class SystemInfo : BaseEntity
{
    [Required]
    [StringLength(100)]
    public string SiteName { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    [StringLength(200)]
    public string? Logo { get; set; }

    [StringLength(200)]
    public string? Favicon { get; set; }

    [StringLength(100)]
    public string? ContactEmail { get; set; }

    [StringLength(20)]
    public string? ContactPhone { get; set; }

    [StringLength(200)]
    public string? Address { get; set; }

    [StringLength(500)]
    public string? SocialLinks { get; set; }

    public string? MetaKeywords { get; set; }

    public string? MetaDescription { get; set; }
} 