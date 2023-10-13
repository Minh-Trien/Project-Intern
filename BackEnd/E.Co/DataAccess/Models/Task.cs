using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    public partial class Task
    {
        public Task()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string? Name { get; set; }

        public virtual Category Category { get; set; } = null!;
        public virtual ICollection<Product> Products { get; set; }
    }
}
