using BLL;
using BLL.Services;
using DataAccess.Models;
using DataAccess.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Numerics;
using System.Security.Claims;
using System.Text;

namespace Shopping.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Email _email;
        private readonly AuthService _authService;              
        private int OTP = 0;
        public AuthController(AuthService authService, Email email)
        {
            _authService = authService;
            _email = email;
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
            
            var reponse = new ServiceResponse
            {
                IsSuccess = true,
                Message = "Register success",
                Data = null
            };
            return Ok(reponse) ;           
        }

        [AllowAnonymous]
        [HttpPost("sendEmail")]
        public async  Task<IActionResult> SendEmail([FromBody] User user)
        {
            string fogot = null;
            
            if (user == null)
            {
                return BadRequest(new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "Register fail",
                    Data = null
                });
            }
    
            int afterSend = _email.sendOTP(user.Email,fogot );        
            var reponse = new ServiceResponse
            {
                IsSuccess = true,
                Message = "SendSuccess",
                Data = afterSend        
            };
            OTP = afterSend; 
            return Ok(reponse);
        }

        

        [AllowAnonymous]
        [HttpPost("confirmEmail")]
        public async Task<IActionResult> ConfirmEmailRegister([FromBody] User user,int otp)
        {     
            if(OTP != otp)
            {
                var reponse = new ServiceResponse
                {
                    IsSuccess = true,
                    Message = "OTP Wrong",                
                };
                return BadRequest(reponse);
            }
            else
            {              
                var use = await _authService.Register(user);
                var reponse = new ServiceResponse
                {
                IsSuccess = true,
                Message = "Register success",
                Data = use
                };
            return Ok(reponse);
            }
        }
    /*    [Authorize(Roles = "OWN_COMPANY")]*/
        [Authorize(Roles = "Everyone")]
        [HttpGet("Test")]
        public IActionResult Test()
        {
            string token = Request.Headers["Authorization"];

            if (token.StartsWith("Bearer"))
            {
                token = token.Substring("Bearer ".Length).Trim();
            }
            var handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwt = handler.ReadJwtToken(token);

            var claims = new Dictionary<string, string>();

            foreach (var claim in jwt.Claims)
            {
                claims.Add(claim.Type, claim.Value);
            }

            return Ok(claims);
        }

    }
}
