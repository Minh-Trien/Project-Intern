using Shopping.Common.Repository;
using Shopping.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerUser.Repository
{
    public class TokenRepository : BaseRepository<Token, string>
    {
        public TokenRepository(Shopping912Context db) : base(db)
        {

        }
        
    }
}
