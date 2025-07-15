using CMS.Common.Interfaces.Repositories;
using CMS.Core.Entities;

namespace CMS.Application.Modules.Home.Queries
{
    public interface IHomeQuery
    {
        Task<SystemInfo?> GetSystemInfoAsync();
        Task<IEnumerable<Menu>> GetMenusAsync();
        Task<IEnumerable<Banner>> GetBannersAsync();
    }
    public class HomeQuery : IHomeQuery
    {
        private readonly IEntityRepository<SystemInfo> _systemInfoRepository;
        private readonly IEntityRepository<Menu> _menuRepository;
        private readonly IEntityRepository<Banner> _bannerRepository;

        public HomeQuery(
            IEntityRepository<SystemInfo> systemInfoRepository,
            IEntityRepository<Menu> menuRepository,
            IEntityRepository<Banner> bannerRepository)
        {
            _systemInfoRepository = systemInfoRepository;
            _menuRepository = menuRepository;
            _bannerRepository = bannerRepository;
        }

        public async Task<SystemInfo?> GetSystemInfoAsync()
        {
            return await _systemInfoRepository.FindAsync(s => !s.IsDeleted);
        }

        public async Task<IEnumerable<Menu>> GetMenusAsync()
        {
            var menus = _menuRepository.List(m => m.IsPublished && !m.IsDeleted)
                .OrderBy(m => m.DisplayOrder)
                .ToList();
            return await Task.FromResult(menus);
        }

        public async Task<IEnumerable<Banner>> GetBannersAsync()
        {
            var banners = _bannerRepository.List(b => b.IsPublished && !b.IsDeleted)
                .OrderBy(b => b.DisplayOrder)
                .ToList();

            return await Task.FromResult(banners);
        }
    }
} 