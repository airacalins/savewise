using Application.Repositories;
using Application.Repositories.Interfaces;

namespace API.Extensions
{
    public static class RepositoryServiceCollection
    {
        public static IServiceCollection AddRepositoryServices(this IServiceCollection services)
        {
            services.AddScoped<ICollectionRepository, CollectionRepository>();

            return services;
        }
    }
}