using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public partial class News
    {
        public News()
        {
            Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime? PostDate { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
