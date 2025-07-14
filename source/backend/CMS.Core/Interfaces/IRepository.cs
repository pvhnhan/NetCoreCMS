using System.Linq.Expressions;

namespace CMS.Core.Interfaces;

/// <summary>
/// Generic repository interface
/// </summary>
/// <typeparam name="T">Entity type</typeparam>
public interface IRepository<T> where T : class
{
    /// <summary>
    /// Lấy tất cả entities
    /// </summary>
    /// <returns>IQueryable của entities</returns>
    IQueryable<T> GetAll();

    /// <summary>
    /// Lấy entity theo ID
    /// </summary>
    /// <param name="id">ID của entity</param>
    /// <returns>Entity hoặc null</returns>
    Task<T?> GetByIdAsync(int id);

    /// <summary>
    /// Lấy entities theo điều kiện
    /// </summary>
    /// <param name="predicate">Điều kiện tìm kiếm</param>
    /// <returns>IQueryable của entities</returns>
    IQueryable<T> Find(Expression<Func<T, bool>> predicate);

    /// <summary>
    /// Thêm entity mới
    /// </summary>
    /// <param name="entity">Entity cần thêm</param>
    /// <returns>Task</returns>
    Task AddAsync(T entity);

    /// <summary>
    /// Cập nhật entity
    /// </summary>
    /// <param name="entity">Entity cần cập nhật</param>
    void Update(T entity);

    /// <summary>
    /// Xóa entity
    /// </summary>
    /// <param name="entity">Entity cần xóa</param>
    void Delete(T entity);

    /// <summary>
    /// Xóa entity theo ID
    /// </summary>
    /// <param name="id">ID của entity</param>
    /// <returns>Task</returns>
    Task DeleteAsync(int id);

    /// <summary>
    /// Kiểm tra entity có tồn tại không
    /// </summary>
    /// <param name="predicate">Điều kiện kiểm tra</param>
    /// <returns>True nếu tồn tại</returns>
    Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
} 