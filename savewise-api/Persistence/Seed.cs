using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<User>{
                    new User{DisplayName = "Bob", Email = "bob@gmail.com", UserName = "bob", EmailConfirmed = true},
                    new User{DisplayName = "Tom", Email = "tom@gmail.com", UserName = "tom", EmailConfirmed = true},
                    new User{DisplayName = "Gerry", Email = "gerry@gmail.com", UserName = "gerry", EmailConfirmed = true},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Collections.Any()) return;

            var collections = new List<Collection>
            {
                new Collection
                {
                    Name = "Savings",
                    CollectionType = CollectionType.Fund
                },
                new Collection
                {
                    Name = "Groceries",
                    CollectionType = CollectionType.Fund
                },
                new Collection
                {
                    Name = "Clothing",
                    CollectionType = CollectionType.Expense
                },
            };
            await context.Collections.AddRangeAsync(collections);
            await context.SaveChangesAsync();
        }
    }
}