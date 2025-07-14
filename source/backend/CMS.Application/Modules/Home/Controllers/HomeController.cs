using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CMS.Core.Interfaces;
using CMS.Core.Entities;

namespace CMS.Application.Modules.Home.Controllers
{
    /// <summary>
    /// Controller cho module Home
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ISystemInfoService _systemInfoService;
        private readonly IMenuService _menuService;
        private readonly IBannerService _bannerService;

        public HomeController(
            ISystemInfoService systemInfoService,
            IMenuService menuService,
            IBannerService bannerService)
        {
            _systemInfoService = systemInfoService;
            _menuService = menuService;
            _bannerService = bannerService;
        }

        /// <summary>
        /// Lấy thông tin tổng hợp cho trang chủ
        /// </summary>
        /// <returns>Thông tin hệ thống, menu và banner đã publish</returns>
        [HttpGet("init")]
        public async Task<IActionResult> GetHomeInfo()
        {
            try
            {
                var systemInfo = await _systemInfoService.GetAsync();
                var publishedMenus = await _menuService.GetPublishedMenusAsync();
                var publishedBanners = await _bannerService.GetPublishedBannersAsync();

                return Ok(new
                {
                    systemInfo,
                    menus = publishedMenus,
                    banners = publishedBanners
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy thông tin cấu hình hệ thống (logo, slogan, địa chỉ, liên hệ)
        /// </summary>
        /// <returns>Thông tin hệ thống website</returns>
        [HttpGet("system-info")]
        public async Task<IActionResult> GetSystemInfo()
        {
            try
            {
                var systemInfo = await _systemInfoService.GetAsync();
                return Ok(systemInfo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy danh sách menu đã được publish
        /// </summary>
        /// <returns>Danh sách menu hiển thị trên website</returns>
        [HttpGet("menus")]
        public async Task<IActionResult> GetPublishedMenus()
        {
            try
            {
                var menus = await _menuService.GetPublishedMenusAsync();
                return Ok(menus);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy danh sách banner đã được publish
        /// </summary>
        /// <returns>Danh sách banner hiển thị trên website</returns>
        [HttpGet("banners")]
        public async Task<IActionResult> GetPublishedBanners()
        {
            try
            {
                var banners = await _bannerService.GetPublishedBannersAsync();
                return Ok(banners);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }
} 