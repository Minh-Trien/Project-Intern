using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Shopping.ManagerProduct.Repository;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerProduct.Infrastructure
{
    public static class Configration
    {
        public static void Configure(this IServiceCollection services, IConfiguration configuration)
        {

            // Database Configuration
            //var local = configuration.GetConnectionString("local");//appsettings
            // Add Repository Services
            services.AddTransient<ProductRepository>();

            // //    services.AddTransient<TokenRepository>();
            services.AddTransient<CartRepository>();
            //    //services.AddTransient<Email>();
        }

    }
}
