using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public partial class Voucher
    {
        public Voucher()
        {
            Orders = new HashSet<Order>();
            VoucherUsers = new HashSet<VoucherUser>();
        }

        public int Id { get; set; }
        public string? Code { get; set; }
        public decimal? Discount { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsActive { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<VoucherUser> VoucherUsers { get; set; }
    }
}
