using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.Models.Models
{
    public partial class Header
    {
        public Header() { }
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? RollName { get; set; }
        public string? Link { get; set; }
    }
}
