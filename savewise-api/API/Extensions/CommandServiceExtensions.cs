using Application.Collections.Commands;
using Application.Collections.Interfaces;
using Application.Transactions.Commands;
using Application.Transactions.Interfaces;

namespace API.Extensions
{
    public static class CommandServiceExtensions
    {
        public static IServiceCollection AddCommandServices(this IServiceCollection services)
        {
            // Collections
            services.AddScoped<IGetCollectionsByTypeCommand, GetCollectionsByTypeCommand>();
            services.AddScoped<IGetCollectionByIdCommand, GetCollectionByIdCommand>();
            services.AddScoped<ICreateCollectionCommand, CreateCollectionCommand>();
            services.AddScoped<IUpdateCollectionCommand, UpdateCollectionCommand>();
            services.AddScoped<IDeleteCollectionCommand, DeleteCollectionCommand>();

            // Transactions
            services.AddScoped<IGetFundTransactionsByCollectionIdCommand, GetFundTransactionsByCollectionIdCommand>();
            services.AddScoped<IGetExpenseTransactionsByCollectionIdCommand, GetExpenseTransactionsByCollectionIdCommand>();
            services.AddScoped<ICreateFundTransactionCommand, CreateFundTransactionCommand>();
            services.AddScoped<IGetTransactionByIdCommand, GetTransactionByIdCommand>();
            services.AddScoped<IUpdateTransactionCommand, UpdateTransactionCommand>();
            services.AddScoped<IDeleteTransactionCommand, DeleteTransactionCommand>();

            return services;
        }
    }
}