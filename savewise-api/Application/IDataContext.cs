using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Application
{
    public interface IDataContext
    {
        DbSet<Collection> Collections { get; set; }
        DbSet<Transaction> Transactions { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}