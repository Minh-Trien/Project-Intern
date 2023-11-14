using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public partial class Product
    {
        public Product()
        {
            CartItems = new HashSet<CartItem>();
            OrderItems = new HashSet<OrderItem>();
            WishLists = new HashSet<WishList>();
        }



        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Descriptions { get; set; }
        public decimal? Price { get; set; }
        public string? Image { get; set; }
        public bool? Hidden { get; set; }
        public int? TaskId { get; set; }
        public int? Quanlity { get; set; }



        public virtual Task? Task { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<WishList> WishLists { get; set; }
    }
}
