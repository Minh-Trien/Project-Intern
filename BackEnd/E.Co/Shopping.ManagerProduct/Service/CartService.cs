
using Shopping.ManagerProduct.Repository;
using Shopping.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerProduct.Services
{
    public class CartService
    {
        private readonly CartRepository _cartRepository;
        private readonly Shopping912Context _db;
        public CartService(CartRepository cartRepository, Shopping912Context db)
        {
            _cartRepository = cartRepository;
            _db = db;
        }
        public async System.Threading.Tasks.Task AddNew(CartItem cartItem)
        {
            await _cartRepository.InsertAsync(cartItem);    
        }
        public async Task<IEnumerable<CartItem>> GetCartItemBySessionId(int sessionID)
        {
          return await _cartRepository.GetCartItemBySessionId(sessionID);
             
        }
        public async Task<CartItem> Update(int id, CartItem existingCartItem)
        {
            return await _cartRepository.UpdateIdAsync(id, existingCartItem);
        }

        public async Task<CartItem> RemoveCartItem(int id)
        {
          return   await _cartRepository.DeleteIdAsync(id);
        }
        public async Task<CartItem> GetCartItemById(int sessionID)
        {
            return await _cartRepository.GetIdAsync(sessionID);

        }

        public async System.Threading.Tasks.Task DeleteAll(int sessionId)
        {
            var cartItems = _db.CartItems.Where(c => c.SessionId == sessionId);
            _db.CartItems.RemoveRange(cartItems);
            _db.SaveChanges();
        }

    }
}
