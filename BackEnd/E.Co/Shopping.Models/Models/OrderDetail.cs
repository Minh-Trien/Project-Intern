using System;
using System.Collections.Generic;

namespace Shopping.Models.Models
{
    public partial class OrderDetail
    {
        public OrderDetail()
        {
            OrderItems = new HashSet<OrderItem>();
        }



        public int Id { get; set; }
        public int? UserId { get; set; }
        public decimal? Total { get; set; }
        public int? PaymentId { get; set; }
        public byte[]? CreateAt { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
