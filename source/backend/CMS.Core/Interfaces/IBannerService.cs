using CMS.Core.Entities;

namespace CMS.Core.Interfaces
{
    /// <summary>
    /// Interface cho Banner service
    /// Cung cấp các phương thức quản lý banner hệ thống
    /// </summary>
    public interface IBannerService
    {
        /// <summary>
        /// Lấy thông tin banner theo ID
        /// </summary>
        /// <param name="id">ID của banner cần lấy</param>
        /// <returns>Thông tin banner hoặc null nếu không tìm thấy</returns>
        Task<Banner?> GetByIdAsync(int id);

        /// <summary>
        /// Lấy danh sách tất cả banner
        /// </summary>
        /// <returns>Danh sách tất cả banner trong hệ thống</returns>
        Task<IEnumerable<Banner>> GetAllAsync();

        /// <summary>
        /// Lấy danh sách banner theo vị trí
        /// </summary>
        /// <param name="position">Vị trí banner (Top, Left, Bottom, Right)</param>
        /// <returns>Danh sách banner theo vị trí</returns>
        Task<IEnumerable<Banner>> GetByPositionAsync(string position);

        /// <summary>
        /// Lấy danh sách banner đã được publish
        /// </summary>
        /// <returns>Danh sách banner hiển thị trên website</returns>
        Task<IEnumerable<Banner>> GetPublishedBannersAsync();

        /// <summary>
        /// Tạo banner mới
        /// </summary>
        /// <param name="banner">Thông tin banner cần tạo</param>
        /// <returns>Banner đã được tạo</returns>
        Task<Banner> CreateAsync(Banner banner);

        /// <summary>
        /// Cập nhật thông tin banner
        /// </summary>
        /// <param name="banner">Thông tin banner cần cập nhật</param>
        /// <returns>Banner đã được cập nhật</returns>
        Task<Banner> UpdateAsync(Banner banner);

        /// <summary>
        /// Xóa banner (soft delete)
        /// </summary>
        /// <param name="id">ID của banner cần xóa</param>
        Task DeleteAsync(int id);

        /// <summary>
        /// Kiểm tra banner có tồn tại hay không
        /// </summary>
        /// <param name="id">ID của banner cần kiểm tra</param>
        /// <returns>True nếu tồn tại, False nếu không</returns>
        Task<bool> ExistsAsync(int id);
    }
} 