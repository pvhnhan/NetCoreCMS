using CMS.Common.Utilities;
using CMS.Core.Entities;

namespace CMS.Infrastructure.Data
{
    public static class AccountSeeder
    {
        public static void Seed(CmsDbContext context)
        {
            var accounts = new List<User>();
            if (context.Users.FirstOrDefault(x => x.Username.ToLower().Equals("admin")) == null)
            {
                var passwordHasher = new PasswordHasher();
                var admin = new User
                {
                    Username = "admin",
                    Email = "admin@cms.com",
                    PasswordHash = passwordHasher.HashPassword("admin123"),
                    Role = "admin",
                    IsActive = true
                };
                accounts.Add(admin);                
            }
            if (context.Users.FirstOrDefault(x => x.Username.ToLower().Equals("manager")) == null)
            {
                var passwordHasher = new PasswordHasher();
                var manager = new User
                {
                    Username = "manager",
                    Email = "manager@cms.com",
                    PasswordHash = passwordHasher.HashPassword("manager123"),
                    Role = "manager",
                    IsActive = true
                };
                accounts.Add(manager);
            }

            if (context.Users.FirstOrDefault(x => x.Username.ToLower().Equals("staff")) == null)
            {
                var passwordHasher = new PasswordHasher();
                var staff = new User
                {
                    Username = "staff",
                    Email = "staff@cms.com",
                    PasswordHash = passwordHasher.HashPassword("staff123"),
                    Role = "staff",
                    IsActive = true
                };
                accounts.Add(staff);
            }
            if (accounts.Count > 0)
            {
                context.Users.AddRange(accounts);
                context.SaveChanges();
            }            
        }
    }
}
