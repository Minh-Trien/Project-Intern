using System;
using System.Collections.Generic;

namespace Shopping.Models.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            News = new HashSet<News>();
            OrderDetails = new HashSet<OrderDetail>();
            ShoppingSessions = new HashSet<ShoppingSession>();
            Tokens = new HashSet<Token>();
            WishLists = new HashSet<WishList>();
        }

        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Role { get; set; }
        public bool? EmailConfirm { get; set; }



        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<News> News { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<ShoppingSession> ShoppingSessions { get; set; }
        public virtual ICollection<Token> Tokens { get; set; }
        public virtual ICollection<WishList> WishLists { get; set; }
    }
}
