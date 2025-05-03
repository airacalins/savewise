using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services
                .AddIdentityApiEndpoints<User>(opt => opt.User.RequireUniqueEmail = true)
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<DataContext>();

            return services;
        }
    }
}