using DataAccess.Interface;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public abstract class BaseRepository<T, TPrimaryKey> : IRepository<T, TPrimaryKey> where T : class
    {
        protected readonly Shopping912Context _db;
        private readonly DbSet<T> entities;

        public BaseRepository(Shopping912Context db)
        {
            _db = db;
            entities = _db.Set<T>();
        }


        public virtual async System.Threading.Tasks.Task DeleteAsync(TPrimaryKey primaryKey)
        {
            var obj = await entities.FindAsync(primaryKey);

            if (obj == null) return;
            else entities.Remove(entity: obj);

            await _db.SaveChangesAsync();
        }

        /// <summary>
        /// Retrieves all entities of type <typeparamref name="T"/> asynchronously.
        /// </summary>
        /// <returns>An asynchronous operation that returns a collection of all entities of type <typeparamref name="T"/>.</returns>
        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await entities.ToListAsync();
        }

        /// <summary>
        /// Retrieves entities of type <typeparamref name="T"/> that match a specified expression asynchronously.
        /// </summary>
        /// <param name="expression">The expression to filter entities.</param>
        /// <returns>An asynchronous operation that returns a collection of filtered entities.</returns>
        public virtual async Task<IEnumerable<T>> GetAllFindAsync(Expression<Func<T, bool>> expression)
        {
            return await entities.Where(expression).ToListAsync();
        }

        /// <summary>
        /// Retrieves an entity of type <typeparamref name="T"/> by its primary key asynchronously.
        /// </summary>
        /// <param name="primaryKey">The primary key of the entity to retrieve.</param>
        /// <returns>An asynchronous operation that returns the entity with the specified primary key.</returns>
        public virtual async Task<T> GetAsync(TPrimaryKey primaryKey)
        {
            return await entities.FindAsync(primaryKey);
        }
        public virtual async Task<T> GetIdAsync(int primaryKey)
        {
            return await entities.FindAsync(primaryKey);
        }

        /// <summary>
        /// Retrieves the first entity of type <typeparamref name="T"/> that matches a specified expression asynchronously.
        /// </summary>
        /// <param name="expression">The expression to filter entities.</param>
        /// <returns>An asynchronous operation that returns the first matching entity.</returns>
        public async Task<T?> GetFirstAsync(Expression<Func<T, bool>> expression)
        {
            return await _db.Set<T>().FirstOrDefaultAsync(expression);
        }

        /// <summary>
        /// Inserts a new entity of type <typeparamref name="T"/> asynchronously.
        /// </summary>
        /// <param name="entity">The entity to insert.</param>
        public virtual async System.Threading.Tasks.Task InsertAsync(T entity)
        {
            await entities.AddAsync(entity);
            await _db.SaveChangesAsync();  
        }

        /// <summary>
        /// Updates an existing entity of type <typeparamref name="T"/> asynchronously based on its primary key.
        /// </summary>
        /// <param name="key">The primary key of the entity to update.</param>
        /// <param name="entity">The updated entity.</param>
        public virtual async Task<T> UpdateIdAsync(int key, T entity)
        {
            var local = await GetIdAsync(key);

            if (local != null)//detached
                _db.Entry(local).State = EntityState.Detached;

            // set Modified flag in your entry
            _db.Entry(entity).State = EntityState.Modified;

            await _db.SaveChangesAsync();//save changes to the database.
            return  entity;
        }

        public virtual async System.Threading.Tasks.Task UpdateAsync(TPrimaryKey key, T entity)
        {
            throw new NotImplementedException();
        }
    }
}
