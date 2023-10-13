using BLL;
using BLL.Services;
using DataAccess.Models;
using DataAccess.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Shopping_v2.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IEmailSender _emailSender;
        private readonly AuthService _authService;
        public AuthController(AuthService authService, IEmailSender emailSender)
        {
            _authService = authService;
            _emailSender = emailSender;

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel user)
        {
            if (user == null)
            {
                return BadRequest(new  ServiceResponse
                {
                    IsSuccess = false,
                    Message = "user null",
                   
                });
            }
            else if (String.IsNullOrEmpty(user.Password))
            {
                return BadRequest( new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "password null",
                    
                });
            }

            var Token = await _authService.Login(user);

            var reponse = new ServiceResponse
            {
                IsSuccess = true,
                Message = "Login success",
                Data = Token
            };

            if (Token != null)
            {
                return Ok(reponse);
            }
            return BadRequest(new ServiceResponse
            {
                IsSuccess = true,
                Message = "Login un success",
  
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest( new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "Register fail",
                    Data = null
                });
            }
            var u = await _authService.Register(user);
            var reponse = new ServiceResponse
            {
                IsSuccess = true,
                Message = "Register success",
                Data = u
            };
            return Ok(reponse) ;           
        }

        [AllowAnonymous]
        [HttpPost("sendEmail")]
        public async Task<IActionResult> SendEmail( string email, string subject, string message)
        {
            
            return Ok();
        }

    }
}
