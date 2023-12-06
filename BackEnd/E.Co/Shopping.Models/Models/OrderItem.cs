using System;
using System.Collections.Generic;

namespace Shopping.Models.Models
{
    public partial class OrderItem
    {
        public int Id { get; set; }
        public int? OrderId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public byte[]? CreateAt { get; set; }



        public virtual OrderDetail? Order { get; set; }
        public virtual Product? Product { get; set; }
    }
}
