using System.ComponentModel.DataAnnotations;

namespace CMS.Core.Entities;

/// <summary>
/// Base entity cho tất cả entities
/// </summary>
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    public bool IsDeleted { get; set; } = false;
} 