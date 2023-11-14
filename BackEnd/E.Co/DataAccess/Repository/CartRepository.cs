using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class CartRepository : BaseRepository<CartItem, string>
    {
        public CartRepository(Shopping912Context db) : base(db)
        {
        }
        public async Task<IEnumerable<CartItem>> GetCartItemBySessionId(int sessionID)
        {
            var cartItems = await _db.CartItems
                .Include(ci => ci.Product) // Eager loading thông tin sản phẩm
                .Where(x => x.SessionId == sessionID)
                .ToListAsync();
            return cartItems;
        }

    }
}
