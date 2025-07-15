using System.ComponentModel.DataAnnotations;

namespace CMS.Core.Entities;

/// <summary>
/// Entity Banner
/// </summary>
public class Banner : BaseEntity
{
    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    [StringLength(200)]
    public string? ImageUrl { get; set; }

    [StringLength(200)]
    public string? LinkUrl { get; set; }

    public int DisplayOrder { get; set; } = 0;

    public bool IsActive { get; set; } = true;

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    [StringLength(20)]
    public string Position { get; set; } = "Home";

    [StringLength(50)]
    public string? ButtonText { get; set; }

    public bool IsExternal { get; set; } = false;
    public bool IsPublished { get; set; }
} 