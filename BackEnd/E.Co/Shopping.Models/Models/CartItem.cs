using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.Models.Models
{
    public partial class CartItem
    {
        public int Id { get; set; }
        public int SessionId { get; set; }
        public int ProductId { get; set; }
        public int? Quantity { get; set; }
        public byte[]? CreateAt { get; set; }
        public virtual Product? Product { get; set; }
        public virtual ShoppingSession? Session { get; set; }
    }
}
