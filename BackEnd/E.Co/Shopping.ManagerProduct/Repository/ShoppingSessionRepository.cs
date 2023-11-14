
using Shopping.Common.Repository;
using Shopping.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerProduct.Repository
{
    public class ShoppingSessionRepository : BaseRepository<ShoppingSession, string>
    {
        public ShoppingSessionRepository(Shopping912Context db) : base(db)
        {

        }


    }
}
