using Shopping.ManagerToken.ViewModels;
using Shopping.Models.Models;
using System.Security.Claims;
using System.Security.Cryptography;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Shopping.ManagerToken.Repository;

namespace Shopping.ManagerToken.Service
{

    public interface IToken
    {
        public  Task<TokenModel> GenerateToken(User user);
        public string GenerateRefreshToken();
        public int GetUserIdByToken(string token) ;
        
    }
    public class TokenService : IToken
    {
        private readonly TokenRepository _tokenRepository;
        private readonly IConfiguration _configuration;
        public TokenService(TokenRepository tokenRepository, IConfiguration configuration)
        {
            _tokenRepository = tokenRepository;
            _configuration = configuration;
        }
        public async Task<TokenModel> GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.LastName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim("id", user.Id.ToString())
                }),
                IssuedAt = DateTime.UtcNow,
                Issuer = _configuration["JWT:Issuer"],
                Audience = _configuration["JWT:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(20),
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

        public string GenerateRefreshToken()
        {
            var random = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(random);

                return Convert.ToBase64String(random);
            }
        }

        public int GetUserIdByToken(string token)
        {
            throw new NotImplementedException();
        }

        public string ExtractUserIdFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            if (token.StartsWith("Bearer"))
            {
                token = token.Substring("Bearer ".Length).Trim();
            }

            var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;

            // Kiểm tra nếu token hợp lệ và có claim "id"
            if (jwtToken != null && jwtToken.Claims.Any(c => c.Type == "id"))
            {
                // Lấy giá trị claim "id"
                return jwtToken.Claims.First(c => c.Type == "id").Value;
            }

            // Trả về null nếu không tìm thấy claim "id"
            return null;
        }

    }
}
