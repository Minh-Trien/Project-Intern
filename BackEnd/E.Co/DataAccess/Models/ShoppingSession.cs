using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class ShoppingSession
    {
        public ShoppingSession()
        {
            CartItems = new HashSet<CartItem>();
        }



        public int Id { get; set; }
        public int? UserId { get; set; }
        public decimal? Total { get; set; }
        public byte[]? CreateAt { get; set; }



        public virtual User? User { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
    }
}
