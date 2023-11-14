using System;
using System.Collections.Generic;

namespace Shopping.Models.Models
{
    public partial class Token
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? Token1 { get; set; }
        public string? JwtId { get; set; }
        public bool? IsUsed { get; set; }
        public bool? IsRevoked { get; set; }
        public DateTime? IssuedAt { get; set; }
        public DateTime? ExpiredAt { get; set; }

        public virtual User? User { get; set; }
    }
}
