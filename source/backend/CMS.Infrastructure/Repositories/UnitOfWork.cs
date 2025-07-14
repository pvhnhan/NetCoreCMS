using CMS.Core.Interfaces;
using CMS.Core.Entities;
using CMS.Infrastructure.Data;

namespace CMS.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly CmsDbContext _context;
    private IRepository<User>? _users;
    private IRepository<SystemInfo>? _systemInfos;
    private IRepository<Menu>? _menus;
    private IRepository<Banner>? _banners;

    public UnitOfWork(CmsDbContext context)
    {
        _context = context;
    }

    public IRepository<User> Users => _users ??= new Repository<User>(_context);
    public IRepository<SystemInfo> SystemInfos => _systemInfos ??= new Repository<SystemInfo>(_context);
    public IRepository<Menu> Menus => _menus ??= new Repository<Menu>(_context);
    public IRepository<Banner> Banners => _banners ??= new Repository<Banner>(_context);

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public async Task BeginTransactionAsync()
    {
        await _context.Database.BeginTransactionAsync();
    }

    public async Task CommitTransactionAsync()
    {
        await _context.Database.CommitTransactionAsync();
    }

    public async Task RollbackTransactionAsync()
    {
        await _context.Database.RollbackTransactionAsync();
    }

    public void Dispose()
    {
        _context?.Dispose();
    }
} 