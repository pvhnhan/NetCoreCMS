namespace CMS.Core.Interfaces;

/// <summary>
/// Unit of Work interface
/// </summary>
public interface IUnitOfWork : IDisposable
{
    /// <summary>
    /// Lưu thay đổi vào database
    /// </summary>
    /// <returns>Số lượng records bị ảnh hưởng</returns>
    Task<int> SaveChangesAsync();

    /// <summary>
    /// Bắt đầu transaction
    /// </summary>
    /// <returns>Transaction</returns>
    Task BeginTransactionAsync();

    /// <summary>
    /// Commit transaction
    /// </summary>
    /// <returns>Task</returns>
    Task CommitTransactionAsync();

    /// <summary>
    /// Rollback transaction
    /// </summary>
    /// <returns>Task</returns>
    Task RollbackTransactionAsync();
} 