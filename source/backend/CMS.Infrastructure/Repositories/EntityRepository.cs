using CMS.Common.Interfaces.Repositories;
using CMS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Linq.Expressions;

namespace CMS.Infrastructure.Repositories
{
    public class EntityRepository<T> : IEntityRepository<T> where T : class
    {
        private readonly CmsDbContext _context;
        private readonly DbSet<T> _dbSet;

        public EntityRepository(CmsDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public T Find(Expression<Func<T, bool>> expression)
        {
            return _dbSet.FirstOrDefault(expression);
        }

        public T Find(Expression<Func<T, bool>> expression, Expression<Func<T, object>>[] includeExpressions)
        {
            var query = _dbSet.AsQueryable();
            foreach (var includeExpression in includeExpressions)
            {
                query = query.Include(includeExpression);
            }
            return query.FirstOrDefault(expression);
        }

        public async Task<T> FindAsync(Expression<Func<T, bool>> expression)
        {
            return await _dbSet.FirstOrDefaultAsync(expression);
        }

        public async Task<T> FindAsync(Expression<Func<T, bool>> expression, Expression<Func<T, object>>[] includeExpressions)
        {
            var query = _dbSet.AsQueryable();
            foreach (var includeExpression in includeExpressions)
            {
                query = query.Include(includeExpression);
            }
            return await query.FirstOrDefaultAsync(expression);
        }

        public IQueryable<T> GetAll()
        {
            return _dbSet.AsQueryable();
        }

        public IQueryable<T> GetAll(Expression<Func<T, object>>[] includeExpressions)
        {
            var query = _dbSet.AsQueryable();
            foreach (var includeExpression in includeExpressions)
            {
                query = query.Include(includeExpression);
            }
            return query;
        }

        public IQueryable<T> List(Expression<Func<T, bool>> expression)
        {
            return _dbSet.Where(expression);
        }

        public IQueryable<T> List(Expression<Func<T, bool>> expression, Expression<Func<T, object>>[] includeExpressions)
        {
            var query = _dbSet.Where(expression);
            foreach (var includeExpression in includeExpressions)
            {
                query = query.Include(includeExpression);
            }
            return query;
        }

        public void Update(T entity)
        {
            _dbSet.Update(entity);
            _context.SaveChanges();
        }

        public void UpdateRange(IEnumerable<T> entities)
        {
            _dbSet.UpdateRange(entities);
            _context.SaveChanges();
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
            _context.SaveChanges();
        }

        public void DeleteRange(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
            _context.SaveChanges();
        }

        public void DeleteReal(T entity)
        {
            _dbSet.Remove(entity);
            _context.SaveChanges();
        }

        public void DeleteRealRange(IEnumerable<T> entities)
        {
            _dbSet.RemoveRange(entities);
            _context.SaveChanges();
        }

        public void Insert(T entity)
        {
            _dbSet.Add(entity);
            _context.SaveChanges();
        }

        public void InsertRange(IEnumerable<T> entities)
        {
            _dbSet.AddRange(entities);
            _context.SaveChanges();
        }

        public int ExecuteCommand(string sql, params object[] parameters)
        {
            return _context.Database.ExecuteSqlRaw(sql, parameters);
        }

        public async Task<int> ExecuteCommandAsync(string sql, params object[] parameters)
        {
            return await _context.Database.ExecuteSqlRawAsync(sql, parameters);
        }

        public IEnumerable<TResult> ExecuteQuery<TResult>(string sql, CommandType commandType = CommandType.Text, params object[] parameters) where TResult : new()
        {
            using var connection = _context.Database.GetDbConnection() as SqlConnection;
            if (connection == null)
                throw new InvalidOperationException("Database connection is not SqlConnection");

            using var command = new SqlCommand(sql, connection);
            command.CommandType = commandType;

            for (int i = 0; i < parameters.Length; i++)
            {
                command.Parameters.AddWithValue($"@p{i}", parameters[i]);
            }

            var result = new List<TResult>();
            connection.Open();
            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                var item = new TResult();
                var properties = typeof(TResult).GetProperties();
                foreach (var property in properties)
                {
                    if (!reader.IsDBNull(reader.GetOrdinal(property.Name)))
                    {
                        property.SetValue(item, reader[property.Name]);
                    }
                }
                result.Add(item);
            }

            return result;
        }

        public async Task<IEnumerable<TResult>> ExecuteQueryAsync<TResult>(string sql, CommandType commandType = CommandType.Text, params object[] parameters) where TResult : new()
        {
            using var connection = _context.Database.GetDbConnection() as SqlConnection;
            if (connection == null)
                throw new InvalidOperationException("Database connection is not SqlConnection");

            using var command = new SqlCommand(sql, connection);
            command.CommandType = commandType;

            for (int i = 0; i < parameters.Length; i++)
            {
                command.Parameters.AddWithValue($"@p{i}", parameters[i]);
            }

            var result = new List<TResult>();
            await connection.OpenAsync();
            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var item = new TResult();
                var properties = typeof(TResult).GetProperties();
                foreach (var property in properties)
                {
                    if (!reader.IsDBNull(reader.GetOrdinal(property.Name)))
                    {
                        property.SetValue(item, reader[property.Name]);
                    }
                }
                result.Add(item);
            }

            return result;
        }

        public DataSet ExecuteQueryReturnDataSet(string queryString, CommandType cmdType = CommandType.Text, params SqlParameter[] parameters)
        {
            using var connection = _context.Database.GetDbConnection() as SqlConnection;
            if (connection == null)
                throw new InvalidOperationException("Database connection is not SqlConnection");

            using var command = new SqlCommand(queryString, connection);
            command.CommandType = cmdType;

            if (parameters != null)
            {
                command.Parameters.AddRange(parameters);
            }

            using var adapter = new SqlDataAdapter(command);
            var dataSet = new DataSet();
            adapter.Fill(dataSet);

            return dataSet;
        }
    }
} 