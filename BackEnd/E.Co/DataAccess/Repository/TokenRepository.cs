using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class TokenRepository : BaseRepository<Token, string>
    {
        public TokenRepository(Shopping912Context db) : base(db)
        {

        }
        
    }
}
