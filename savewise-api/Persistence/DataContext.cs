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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Collection>().HasData(
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now,
                    CollectionType = Domain.Enums.CollectionType.Expense,
                    CurrentMonthTotal = 5000.00,
                    YearToDateTotal = 30000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Date = DateTime.Now.AddMonths(-1),
                    CollectionType = Domain.Enums.CollectionType.Fund,
                    CurrentMonthTotal = 10000.00,
                    YearToDateTotal = 50000.00,
                    CreatedAt = DateTime.Now.AddMonths(-1)
                }
            );
        }
    }
}