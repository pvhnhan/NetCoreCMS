using System.ComponentModel.DataAnnotations;

namespace CMS.Core.Entities;

/// <summary>
/// Entity quản lý menu hệ thống
/// </summary>
public class Menu : BaseEntity
{
    /// <summary>
    /// Tên menu
    /// </summary>
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Mô tả menu
    /// </summary>
    [StringLength(500)]
    public string? Description { get; set; }

    /// <summary>
    /// URL của menu
    /// </summary>
    [StringLength(200)]
    public string? Url { get; set; }

    /// <summary>
    /// Icon của menu (Font Awesome class)
    /// </summary>
    [StringLength(50)]
    public string? Icon { get; set; }

    /// <summary>
    /// Thứ tự hiển thị
    /// </summary>
    public int Order { get; set; } = 0;

    /// <summary>
    /// Menu cha (self-referencing)
    /// </summary>
    public int? ParentId { get; set; }

    /// <summary>
    /// Menu cha
    /// </summary>
    public Menu? Parent { get; set; }

    /// <summary>
    /// Danh sách menu con
    /// </summary>
    public virtual ICollection<Menu> Children { get; set; } = new List<Menu>();

    /// <summary>
    /// Vị trí hiển thị (Header, Footer, Sidebar)
    /// </summary>
    [Required]
    [StringLength(20)]
    public string Position { get; set; } = "Header";

    /// <summary>
    /// Có mở trong tab mới không
    /// </summary>
    public bool OpenInNewTab { get; set; } = false;

    /// <summary>
    /// Vai trò được phép truy cập (Admin, Manager, Editor, User)
    /// </summary>
    [StringLength(50)]
    public string? AllowedRoles { get; set; }
} 