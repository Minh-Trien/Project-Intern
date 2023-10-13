using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public partial class VoucherUser
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? VoucherId { get; set; }

        public virtual User? User { get; set; }
        public virtual Voucher? Voucher { get; set; }
    }
}
