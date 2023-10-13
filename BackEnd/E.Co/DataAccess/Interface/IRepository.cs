using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Interface
{
    public interface IRepository<T, in TPrimaryKey> where T : class
    {
        public Task<T> GetAsync(TPrimaryKey primaryKey);
       
        public Task<T> GetFirstAsync(Expression<Func<T, bool>> expression);
     
        public Task<IEnumerable<T>> GetAllAsync();
 
        public Task<IEnumerable<T>> GetAllFindAsync(Expression<Func<T, bool>> expression);

        public Task InsertAsync(T entity);

        public Task DeleteAsync(TPrimaryKey primaryKey);
       
        public Task UpdateAsync(TPrimaryKey key, T entity);
    }
}
