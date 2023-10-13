using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;

/*namespace Shopping.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly Shopping912Context _context;
        public LoginController(Shopping912Context context)
        {
            _context = context;
        }

        [HttpGet()]
        public async Task<ActionResult<Admin>> Get(
            [FromQuery] string email ,
            [FromQuery] string? password 
            )
        {
            var admin =  _context.Admins.FirstOrDefault(a => a.Email.Equals(email.Trim()) && a.Password.Equals(password.Trim())) ;
            if (admin == null )
            {
                return NotFound();
            }
            return admin;
        }




    }
}
*/