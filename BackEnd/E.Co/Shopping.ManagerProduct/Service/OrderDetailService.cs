using Shopping.ManagerProduct.Repository;
using Shopping.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerProduct.Service
{  
    public interface IOrderDetail
        {
            public Task<OrderDetail> GetAsync(int primaryKey);

            public Task<OrderDetail> GetFirstAsync(Expression<Func<OrderDetail, bool>> expression);

            public Task<IEnumerable<OrderDetail>> GetAllAsync();

            public Task<IEnumerable<OrderDetail>> GetAllFindAsync(Expression<Func<OrderDetail, bool>> expression);

            public System.Threading.Tasks.Task InsertAsync(OrderDetail entity);

            public System.Threading.Tasks.Task DeleteAsync(int primaryKey);

            public System.Threading.Tasks.Task UpdateAsync(int key, OrderDetail entity);
        }
    public class OrderDetailService : IOrderDetail
    {
        private readonly OrderDetailRepository _orderDetailRepository;
        public OrderDetailService(OrderDetailRepository orderDetailRepository) {
            _orderDetailRepository = orderDetailRepository;
        }

        public System.Threading.Tasks.Task DeleteAsync(int primaryKey)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OrderDetail>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OrderDetail>> GetAllFindAsync(Expression<Func<OrderDetail, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDetail> GetAsync(int primaryKey)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDetail> GetFirstAsync(Expression<Func<OrderDetail, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public async System.Threading.Tasks.Task InsertAsync(OrderDetail entity)
        {

         await _orderDetailRepository.InsertAsyncReturn(entity);   
        }

        public System.Threading.Tasks.Task UpdateAsync(int key, OrderDetail entity)
        {
            throw new NotImplementedException();
        }
    }
}
