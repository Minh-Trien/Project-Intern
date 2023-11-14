using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ViewModels
{
    public class CartViewModel
    {
        public int totalItem { get; set; }
        public decimal totalPrice { get; set; }
        public IEnumerable<Object> Data { get; set; }
    }
}
