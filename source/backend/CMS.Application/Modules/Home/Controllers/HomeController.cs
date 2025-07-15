using Microsoft.AspNetCore.Mvc;
using CMS.Core.Entities;
using CMS.Application.DTOs.Responses;
using CMS.Application.Modules.Home.Queries;

namespace CMS.Application.Modules.Home.Controllers
{
    /// <summary>
    /// Controller cho module Home
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IHomeQuery _homeQuery;

        public HomeController(IHomeQuery homeQuery)
        {
            _homeQuery = homeQuery;
        }

        /// <summary>
        /// Lấy thông tin tổng hợp cho trang chủ
        /// </summary>
        /// <returns>Thông tin hệ thống, menu và banner đã publish</returns>
        [HttpGet("init")]
        public async Task<IActionResult> GetHomeInfo()
        {
            var systemInfo = await _homeQuery.GetSystemInfoAsync();
            var publishedMenus = await _homeQuery.GetMenusAsync();
            var publishedBanners = await _homeQuery.GetBannersAsync();

            return Ok(new ApiResponse<object>(data: new
            {
                systemInfo,
                menus = publishedMenus,
                banners = publishedBanners
            }, message: "Lấy thông tin trang chủ thành công"));
        }

        /// <summary>
        /// Lấy thông tin cấu hình hệ thống (logo, slogan, địa chỉ, liên hệ)
        /// </summary>
        /// <returns>Thông tin hệ thống website</returns>
        [HttpGet("system-info")]
        public async Task<IActionResult> GetSystemInfo()
        {
            var systemInfo = await _homeQuery.GetSystemInfoAsync();
            return Ok(new ApiResponse<SystemInfo>(data: systemInfo, message: "Lấy thông tin hệ thống thành công"));
        }

        /// <summary>
        /// Lấy danh sách menu đã được publish
        /// </summary>
        /// <returns>Danh sách menu hiển thị trên website</returns>
        [HttpGet("menus")]
        public async Task<IActionResult> GetMenus()
        {
            var menus = await _homeQuery.GetMenusAsync();
            return Ok(new ApiResponse<IEnumerable<Menu>>(data: menus, message: "Lấy danh sách menu thành công"));
        }

        /// <summary>
        /// Lấy danh sách banner đã được publish
        /// </summary>
        /// <returns>Danh sách banner hiển thị trên website</returns>
        [HttpGet("banners")]
        public async Task<IActionResult> GetBanners()
        {
            var banners = await _homeQuery.GetBannersAsync();
            return Ok(new ApiResponse<IEnumerable<Banner>>(data: banners, message: "Lấy danh sách banner thành công"));
        }
    }
} 