using CMS.Core.Interfaces;
using CMS.Infrastructure.Data;

namespace CMS.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly CmsDbContext _context;

    public UnitOfWork(CmsDbContext context)
    {
        _context = context;
    }

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