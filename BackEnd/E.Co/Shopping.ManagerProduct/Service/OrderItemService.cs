using Microsoft.EntityFrameworkCore.Infrastructure;
using Shopping.ManagerProduct.Repository;
using Shopping.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerProduct.Service
{
    public interface IOrderItem
    {
        public Task<OrderItem> GetAsync(int primaryKey);

        public Task<OrderItem> GetFirstAsync(Expression<Func<OrderDetail, bool>> expression);

        public Task<IEnumerable<OrderItem>> GetAllAsync();

        public Task<IEnumerable<OrderItem>> GetAllFindAsync(Expression<Func<OrderItem, bool>> expression);

        public System.Threading.Tasks.Task InsertAsync(OrderItem entity);

        public System.Threading.Tasks.Task DeleteAsync(int primaryKey);

        public System.Threading.Tasks.Task UpdateAsync(int key, OrderItem entity);

        public  OrderItem GetByProductID(int primaryKey);
    }

    public class OrderItemService : IOrderItem
    {
        private readonly OrderItemRepository _orderItemRepository;
        private readonly Shopping912Context _db;
        public OrderItemService(OrderItemRepository orderItemRepository, Shopping912Context db)
        {
            _orderItemRepository = orderItemRepository;
            _db = db;
        }

        public System.Threading.Tasks.Task DeleteAsync(int primaryKey)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OrderItem>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<OrderItem>> GetAllFindAsync(Expression<Func<OrderItem, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task<OrderItem> GetAsync(int primaryKey)
        {
            return  _orderItemRepository.GetIdAsync(primaryKey);
        }

        public  OrderItem GetByProductID(int primaryKey)
        {
            var o =  _db.OrderItems.FirstOrDefault(o => o.ProductId ==  primaryKey);
            return o;
        }

        public Task<OrderItem> GetFirstAsync(Expression<Func<OrderDetail, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public System.Threading.Tasks.Task InsertAsync(OrderItem entity)
        {       
           return _orderItemRepository.InsertAsyncReturn(entity);
        }

        public System.Threading.Tasks.Task UpdateAsync(int key, OrderItem entity)
        {
            return _orderItemRepository.UpdateAsync(key, entity);
        }
    }
}
