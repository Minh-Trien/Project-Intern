using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Shopping.Models.Models
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
        [JsonIgnore]
        public virtual ICollection<CartItem> CartItems { get; set; }
        [JsonIgnore]
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        [JsonIgnore]
        public virtual ICollection<WishList> WishLists { get; set; }
    }
}
