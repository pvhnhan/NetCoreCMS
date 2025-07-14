using CMS.Core.Entities;

namespace CMS.Core.Interfaces
{
    /// <summary>
    /// Interface cho SystemInfo service
    /// Cung cấp các phương thức quản lý thông tin cấu hình hệ thống
    /// </summary>
    public interface ISystemInfoService
    {
        /// <summary>
        /// Lấy thông tin cấu hình hệ thống
        /// </summary>
        /// <returns>Thông tin hệ thống hoặc null nếu chưa có</returns>
        Task<SystemInfo?> GetAsync();

        /// <summary>
        /// Tạo thông tin cấu hình hệ thống mới
        /// </summary>
        /// <param name="systemInfo">Thông tin hệ thống cần tạo</param>
        /// <returns>Thông tin hệ thống đã được tạo</returns>
        Task<SystemInfo> CreateAsync(SystemInfo systemInfo);

        /// <summary>
        /// Cập nhật thông tin cấu hình hệ thống
        /// </summary>
        /// <param name="systemInfo">Thông tin hệ thống cần cập nhật</param>
        /// <returns>Thông tin hệ thống đã được cập nhật</returns>
        Task<SystemInfo> UpdateAsync(SystemInfo systemInfo);
    }
} 