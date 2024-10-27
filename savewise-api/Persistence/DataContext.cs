using Application;
using Domain.Entities;
using Domain.Enums;
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
                // Funds Collections
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Emergency",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Fund,
                    CurrentMonthTotal = 5000.00,
                    YearToDateTotal = 30000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Retirement",
                    Date = DateTime.Now.AddMonths(-1),
                    CollectionType = CollectionType.Fund,
                    CurrentMonthTotal = 12000.00,
                    YearToDateTotal = 60000.00,
                    CreatedAt = DateTime.Now.AddMonths(-1)
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Investment",
                    Date = DateTime.Now.AddMonths(-2),
                    CollectionType = CollectionType.Fund,
                    CurrentMonthTotal = 8000.00,
                    YearToDateTotal = 50000.00,
                    CreatedAt = DateTime.Now.AddMonths(-2)
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Vacation",
                    Date = DateTime.Now.AddMonths(-3),
                    CollectionType = CollectionType.Fund,
                    CurrentMonthTotal = 3000.00,
                    YearToDateTotal = 15000.00,
                    CreatedAt = DateTime.Now.AddMonths(-3)
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Education",
                    Date = DateTime.Now.AddMonths(-4),
                    CollectionType = CollectionType.Fund,
                    CurrentMonthTotal = 7000.00,
                    YearToDateTotal = 35000.00,
                    CreatedAt = DateTime.Now.AddMonths(-4)
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Business",
                    Date = DateTime.Now.AddMonths(-5),
                    CollectionType = CollectionType.Fund,
                    CurrentMonthTotal = 9000.00,
                    YearToDateTotal = 40000.00,
                    CreatedAt = DateTime.Now.AddMonths(-5)
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Health",
                    Date = DateTime.Now.AddMonths(-6),
                    CollectionType = CollectionType.Fund,
                    CurrentMonthTotal = 6000.00,
                    YearToDateTotal = 28000.00,
                    CreatedAt = DateTime.Now.AddMonths(-6)
                },

                // Expense Collections
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Utilities",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Expense,
                    CurrentMonthTotal = 1500.75,
                    YearToDateTotal = 12000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Living Expenses",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Expense,
                    CurrentMonthTotal = 3000.00,
                    YearToDateTotal = 25000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Savings",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Expense,
                    CurrentMonthTotal = 2000.50,
                    YearToDateTotal = 18000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Travel",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Expense,
                    CurrentMonthTotal = 1200.00,
                    YearToDateTotal = 10000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Entertainment",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Expense,
                    CurrentMonthTotal = 800.00,
                    YearToDateTotal = 7000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Groceries",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Expense,
                    CurrentMonthTotal = 900.00,
                    YearToDateTotal = 8000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Healthcare",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Expense,
                    CurrentMonthTotal = 650.25,
                    YearToDateTotal = 5000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Education",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Expense,
                    CurrentMonthTotal = 1300.00,
                    YearToDateTotal = 11000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Miscellaneous",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Expense,
                    CurrentMonthTotal = 400.00,
                    YearToDateTotal = 3000.00,
                    CreatedAt = DateTime.Now
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Insurance",
                    Date = DateTime.Now,
                    CollectionType = CollectionType.Expense,
                    CurrentMonthTotal = 600.50,
                    YearToDateTotal = 4500.00,
                    CreatedAt = DateTime.Now
                },
                // Additional 'Fund' collections
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Emergency Fund",
                    Date = DateTime.Now.AddMonths(-1),
                    CollectionType = CollectionType.Fund,
                    CurrentMonthTotal = 10000.00,
                    YearToDateTotal = 50000.00,
                    CreatedAt = DateTime.Now.AddMonths(-1)
                },
                new Collection
                {
                    Id = Guid.NewGuid(),
                    Name = "Retirement Fund",
                    Date = DateTime.Now.AddMonths(-2),
                    CollectionType = CollectionType.Fund,
                    CurrentMonthTotal = 15000.00,
                    YearToDateTotal = 70000.00,
                    CreatedAt = DateTime.Now.AddMonths(-2)
                }
            );
        }
    }
}