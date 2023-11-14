using DataAccess.Models;
using DataAccess.Repository;
using DataAccess.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class CartService
    {
        private readonly CartRepository _cartRepository;
        public CartService(CartRepository cartRepository )
        {
            _cartRepository = cartRepository;
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

    }
}
