using Microsoft.AspNetCore.SignalR;
using Shopping.ManagerUser.Repository;
using Shopping.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerUser.Services
{
    public class HeaderService
    {
        private readonly HeaderRepository _headerRepository;
        public HeaderService(HeaderRepository headerRepository)
        {
            _headerRepository = headerRepository;
        }
        public async  Task<IEnumerable<Header>> GetAll(string rollName)
        {
            var Headers = await _headerRepository.GetFollowRoll(rollName);

            return Headers;
        }
    }
}
