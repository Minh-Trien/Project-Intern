using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shopping.ManagerUser.Services;
using Shopping.Models.Models;

namespace Shopping.AppUser.Controllers
{
    [Route("api/header")]
    [ApiController]
    public class HeaderController : ControllerBase
    {
        private readonly HeaderService _headerService;
        public HeaderController(HeaderService headerService)
        {
            _headerService = headerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Header>>> GetAllHeaderFollowRoll(string rollName)
        {
            var hearers = _headerService.GetAll(rollName);
            return Ok(hearers);
        }


    }
}
