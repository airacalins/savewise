using Application;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext, IDataContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Collection> Collections { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}