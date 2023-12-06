using Microsoft.EntityFrameworkCore.SqlServer.Update.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Shopping.ManagerProduct.Repository;
using Shopping.ManagerProduct.Service;
using Shopping.ManagerToken.Repository;
using Shopping.ManagerToken.Service;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerProduct.Infrastructure
{
    public static class ConfigrationBLL
    {
        public static void Configure(this IServiceCollection services, IConfiguration configuration)
        {

            // Database Configuration
            //var local = configuration.GetConnectionString("local");//appsettings
            // Add Repository Services
            services.AddTransient<ProductRepository>();
            services.AddTransient<OrderDetailRepository>();
            services.AddTransient<OrderItemRepository>();
            
            services.AddTransient<TokenRepository>();
            services.AddTransient<CartRepository>();
            services.AddTransient<ShoppingSessionRepository>();
            //    //services.AddTransient<Email>();

            services.AddTransient<ShoppingSessionService>();
            services.AddTransient<OrderDetailService>();
            services.AddTransient<OrderItemService>();
            services.AddTransient<TokenService>();
        }

    }
}
