using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Task_WebSolution.Context.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace Task_WebSolution.Context
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(IServiceProvider serviceProvider)
        {
            var scope = serviceProvider.CreateScope();
            await using var context = scope.ServiceProvider.GetService<ApplicationDbContext>();
            var isExists = context!.GetService<IDatabaseCreator>() is RelationalDatabaseCreator databaseCreator &&
                await databaseCreator.ExistsAsync();

            //if (isExists) return;

            await context!.Database.MigrateAsync();

            Seed(context);

            await context.SaveChangesAsync();
        }

        private static void Seed(ApplicationDbContext dbContext)
        {
            dbContext.Set<User>().AddRange(CreateDefaultUsers());
        }

        private static IEnumerable<User> CreateDefaultUsers()
        {
            return new List<User> 
            { 
                new User {}, new User {}, new User {}, new User {}, new User {},
                new User {}, new User {}, new User {}, new User {}, new User {},
                new User {}, new User {}, new User {}, new User {}, new User {},
                new User {}, new User {}, new User {}, new User {}, new User {},
                new User {}, new User {}, new User {}, new User {}, new User {},
                new User {}, new User {}, new User {}, new User {}, new User {},
                new User {}, new User {}, new User {}, new User {}, new User {},
                new User {}, new User {}, new User {}, new User {}, new User {},
                new User {}, new User {}, new User {}, new User {}, new User {},
                new User {}, new User {}, new User {}, new User {}, new User {}
            };
        }
    }
}
