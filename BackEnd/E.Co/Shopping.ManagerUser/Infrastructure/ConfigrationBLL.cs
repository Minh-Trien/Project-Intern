using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Shopping.ManagerToken.Repository;
using Shopping.ManagerToken.Service;
using Shopping.ManagerUser.Repository;
using Shopping.ManagerUser.Services;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerUser.Infrastructure
{
    public static class ConfigrationBLL
    {
        public static void Configure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<UserRepository>();
            services.AddTransient<TokenRepository>();
            services.AddTransient<HeaderRepository>();

            services.AddTransient<Email>();
            services.AddTransient<HeaderService>();
            services.AddTransient<UserService>();
            services.AddTransient<AuthService>();
            services.AddTransient<TokenService>();

            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.Cookie.Name = ".AdventureWorks.Session";
                options.IdleTimeout = TimeSpan.FromSeconds(10);
                options.Cookie.IsEssential = true;
            });



        }
       
    }
}
