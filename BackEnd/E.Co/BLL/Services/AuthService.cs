using DataAccess.Models;
using DataAccess.Repository;
using DataAccess.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BLL.Services
{
    public class AuthService
    {
       
        private readonly UserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly TokenRepository _tokenRepository;
        public AuthService(UserRepository userRepository, IConfiguration configuration, TokenRepository tokenRepository)
        {
            _userRepository = userRepository;
            _tokenRepository = tokenRepository;
            _configuration = configuration;
            
        }

      
        public static string EncryptMD5(string input)
            {
            using (MD5 md5 = MD5.Create())
                {
                    byte[] inputBytes = Encoding.ASCII.GetBytes(input);
                    byte[] hashBytes = md5.ComputeHash(inputBytes);

                    StringBuilder builder = new();
                    for (int i = 0; i < hashBytes.Length; i++)
                    {
                        builder.Append(hashBytes[i].ToString("x2")); // Convert to hexadecimal
                    }
                    return builder.ToString();
                }
            }

        public async Task<TokenModel> Login(LoginModel model)
        {
            try
            {
                var user = await _userRepository.GetFirstAsync(e => e.Email == model.Email);
                var pass = EncryptMD5(model.Password);

                if (user == null || pass != user.Password)
                {
                    return null; // Login unsuccessful
                }

                var token = await GenerateToken(user);

                return token;
            }
            catch (Exception ex)
            {
                // Handle the exception (e.g., log, return an error response)
                throw; // Re-throw the exception or handle it accordingly
            }
        }


        public async Task<User> Register(User user)
        {
            if(user == null)
            {
                return null;
            }
            var userRegister = new User
            {
                Email = user.Email,
                Password = EncryptMD5(user.Password),
                Phone = user.Phone,
                Address = user.Address,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
            await  _userRepository.InsertAsync(userRegister);
            return userRegister;
        }

        private async Task<TokenModel> GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.LastName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim("Email", user.Email),
                }),
                IssuedAt = DateTime.UtcNow,
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                Expires = DateTime.UtcNow.AddSeconds(20),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var accessToken = tokenHandler.WriteToken(token);
            var refreshToken = GenerateRefreshToken();

           
            var refreshTokenEntity = new Token
            {           
                JwtId = token.Id,
                UserId = user.Id,
                Token1 = refreshToken,
                IsUsed = false,
                IsRevoked = false,
                IssuedAt = DateTime.UtcNow,
                ExpiredAt = DateTime.UtcNow.AddHours(1)
            };
            await _tokenRepository.InsertAsync(refreshTokenEntity);
            return new TokenModel
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        private string GenerateRefreshToken()
        {
            var random = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(random);

                return Convert.ToBase64String(random);
            }
        }


    }
}
