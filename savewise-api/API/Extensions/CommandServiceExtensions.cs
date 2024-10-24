using Application.Commands;
using Application.Commands.Interfaces;

namespace API.Extensions
{
    public static class CommandServiceExtensions
    {
        public static IServiceCollection AddCommandServices(this IServiceCollection services)
        {
            services.AddScoped<IGetCollectionsCommand, GetCollectionsCommand>();

            return services;
        }
    }
}