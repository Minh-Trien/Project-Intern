using System;
using System.Collections.Generic;

namespace Shopping.Models.Models
{
    public partial class Category
    {
        public Category()
        {
            Tasks = new HashSet<Task>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }
    }
}
