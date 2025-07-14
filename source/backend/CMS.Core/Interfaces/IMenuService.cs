using CMS.Core.Entities;

namespace CMS.Core.Interfaces
{
    /// <summary>
    /// Interface cho Menu service
    /// Cung cấp các phương thức quản lý menu hệ thống
    /// </summary>
    public interface IMenuService
    {
        /// <summary>
        /// Lấy thông tin menu theo ID
        /// </summary>
        /// <param name="id">ID của menu cần lấy</param>
        /// <returns>Thông tin menu hoặc null nếu không tìm thấy</returns>
        Task<Menu?> GetByIdAsync(int id);

        /// <summary>
        /// Lấy danh sách tất cả menu
        /// </summary>
        /// <returns>Danh sách tất cả menu trong hệ thống</returns>
        Task<IEnumerable<Menu>> GetAllAsync();

        /// <summary>
        /// Lấy danh sách menu đã được publish
        /// </summary>
        /// <returns>Danh sách menu hiển thị trên website</returns>
        Task<IEnumerable<Menu>> GetPublishedMenusAsync();

        /// <summary>
        /// Lấy danh sách menu theo level
        /// </summary>
        /// <param name="level">Level của menu (0, 1, 2...)</param>
        /// <returns>Danh sách menu theo level</returns>
        Task<IEnumerable<Menu>> GetMenusByLevelAsync(int level);

        /// <summary>
        /// Tạo menu mới
        /// </summary>
        /// <param name="menu">Thông tin menu cần tạo</param>
        /// <returns>Menu đã được tạo</returns>
        Task<Menu> CreateAsync(Menu menu);

        /// <summary>
        /// Cập nhật thông tin menu
        /// </summary>
        /// <param name="menu">Thông tin menu cần cập nhật</param>
        /// <returns>Menu đã được cập nhật</returns>
        Task<Menu> UpdateAsync(Menu menu);

        /// <summary>
        /// Xóa menu (soft delete)
        /// </summary>
        /// <param name="id">ID của menu cần xóa</param>
        Task DeleteAsync(int id);

        /// <summary>
        /// Kiểm tra menu có tồn tại hay không
        /// </summary>
        /// <param name="id">ID của menu cần kiểm tra</param>
        /// <returns>True nếu tồn tại, False nếu không</returns>
        Task<bool> ExistsAsync(int id);
    }
} 