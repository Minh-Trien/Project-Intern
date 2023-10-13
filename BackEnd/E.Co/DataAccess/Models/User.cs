using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
            News = new HashSet<News>();
            Orders = new HashSet<Order>();
            Tokens = new HashSet<Token>();
            VoucherUsers = new HashSet<VoucherUser>();
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

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<News> News { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Token> Tokens { get; set; }
        public virtual ICollection<VoucherUser> VoucherUsers { get; set; }
        public virtual ICollection<WishList> WishLists { get; set; }
    }
}
