using CMS.Core.Entities;

namespace CMS.Core.Interfaces
{
    /// <summary>
    /// Interface cho User service
    /// Cung cấp các phương thức quản lý người dùng và mật khẩu
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Lấy thông tin người dùng theo ID
        /// </summary>
        /// <param name="id">ID của người dùng</param>
        /// <returns>Thông tin người dùng hoặc null nếu không tìm thấy</returns>
        Task<User?> GetByIdAsync(int id);

        /// <summary>
        /// Lấy thông tin người dùng theo username
        /// </summary>
        /// <param name="username">Username của người dùng</param>
        /// <returns>Thông tin người dùng hoặc null nếu không tìm thấy</returns>
        Task<User?> GetByUsernameAsync(string username);

        /// <summary>
        /// Lấy thông tin người dùng theo email
        /// </summary>
        /// <param name="email">Email của người dùng</param>
        /// <returns>Thông tin người dùng hoặc null nếu không tìm thấy</returns>
        Task<User?> GetByEmailAsync(string email);

        /// <summary>
        /// Lấy danh sách tất cả người dùng
        /// </summary>
        /// <returns>Danh sách tất cả người dùng trong hệ thống</returns>
        Task<IEnumerable<User>> GetAllAsync();

        /// <summary>
        /// Tạo người dùng mới với mật khẩu
        /// </summary>
        /// <param name="user">Thông tin người dùng</param>
        /// <param name="password">Mật khẩu của người dùng</param>
        /// <returns>Người dùng đã được tạo</returns>
        Task<User> CreateAsync(User user, string password);

        /// <summary>
        /// Cập nhật thông tin người dùng
        /// </summary>
        /// <param name="user">Thông tin người dùng cần cập nhật</param>
        /// <returns>Người dùng đã được cập nhật</returns>
        Task<User> UpdateAsync(User user);

        /// <summary>
        /// Xóa người dùng (soft delete)
        /// </summary>
        /// <param name="id">ID của người dùng cần xóa</param>
        Task DeleteAsync(int id);

        /// <summary>
        /// Xác thực mật khẩu của người dùng
        /// </summary>
        /// <param name="userId">ID của người dùng</param>
        /// <param name="password">Mật khẩu cần xác thực</param>
        /// <returns>True nếu mật khẩu đúng, False nếu sai</returns>
        Task<bool> ValidatePasswordAsync(int userId, string password);

        /// <summary>
        /// Đổi mật khẩu của người dùng
        /// </summary>
        /// <param name="userId">ID của người dùng</param>
        /// <param name="currentPassword">Mật khẩu hiện tại</param>
        /// <param name="newPassword">Mật khẩu mới</param>
        /// <returns>True nếu đổi thành công, False nếu mật khẩu hiện tại sai</returns>
        Task<bool> ChangePasswordAsync(int userId, string currentPassword, string newPassword);

        /// <summary>
        /// Reset mật khẩu của người dùng
        /// </summary>
        /// <param name="userId">ID của người dùng</param>
        /// <param name="newPassword">Mật khẩu mới</param>
        /// <returns>True nếu reset thành công</returns>
        Task<bool> ResetPasswordAsync(int userId, string newPassword);

        /// <summary>
        /// Cập nhật thời gian đăng nhập cuối cùng của người dùng
        /// </summary>
        /// <param name="userId">ID của người dùng</param>
        Task UpdateLastLoginAsync(int userId);
    }
} 