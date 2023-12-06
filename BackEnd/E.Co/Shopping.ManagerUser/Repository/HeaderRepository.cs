using Shopping.Common.Repository;
using Shopping.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerUser.Repository
{
    public class HeaderRepository : BaseRepository<Header, String>
    {
        public HeaderRepository(Shopping912Context db) : base(db)
        {         
        }

        public async Task<IEnumerable<Header>> GetFollowRoll(string rollName)
        {
            return  _db.Headers.Where(h => h.RollName.Contains(rollName)).ToList();
        }

    }
}
