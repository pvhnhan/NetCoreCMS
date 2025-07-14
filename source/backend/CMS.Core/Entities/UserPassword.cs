using System.ComponentModel.DataAnnotations;

namespace CMS.Core.Entities
{
    /// <summary>
    /// Entity lưu trữ mật khẩu người dùng theo thời gian
    /// Hỗ trợ lưu trữ nhiều mật khẩu cho một người dùng với thời gian hết hạn
    /// </summary>
    public class UserPassword : BaseEntity
    {
        /// <summary>
        /// ID của người dùng sở hữu mật khẩu này
        /// </summary>
        [Required]
        public int UserId { get; set; }
        
        /// <summary>
        /// Hash của mật khẩu (đã được mã hóa)
        /// </summary>
        [Required]
        [StringLength(255)]
        public string PasswordHash { get; set; } = string.Empty;
        
        /// <summary>
        /// Salt được sử dụng để mã hóa mật khẩu
        /// </summary>
        [StringLength(255)]
        public string? Salt { get; set; }
        
        /// <summary>
        /// Thời gian hết hạn của mật khẩu (UTC)
        /// </summary>
        public DateTime ExpiresAt { get; set; }
        
        /// <summary>
        /// Trạng thái mật khẩu hiện tại
        /// True: đang sử dụng, False: đã thay thế
        /// </summary>
        public bool IsCurrent { get; set; } = false;
        
        /// <summary>
        /// Tham chiếu đến người dùng sở hữu mật khẩu này
        /// </summary>
        public virtual User User { get; set; } = null!;
    }
} 