using Shopping.Common.Repository;
using Shopping.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerProduct.Repository
{
    public class OrderDetailRepository : BaseRepository<OrderDetail, string>
    {
        public OrderDetailRepository(Shopping912Context db) : base(db)
        {

        }
    }
}
