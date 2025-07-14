using Microsoft.EntityFrameworkCore;
using CMS.Core.Entities;

namespace CMS.Infrastructure.Data;

public class CmsDbContext : DbContext
{
    public CmsDbContext(DbContextOptions<CmsDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<SystemInfo> SystemInfos { get; set; }
    public DbSet<Menu> Menus { get; set; }
    public DbSet<Banner> Banners { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.Property(e => e.FullName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.PasswordHash).IsRequired();
            entity.Property(e => e.Role).HasMaxLength(20);
            entity.HasIndex(e => e.Username).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
        });

        // SystemInfo configuration
        modelBuilder.Entity<SystemInfo>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.SiteName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Logo).HasMaxLength(200);
            entity.Property(e => e.Favicon).HasMaxLength(200);
            entity.Property(e => e.ContactEmail).HasMaxLength(100);
            entity.Property(e => e.ContactPhone).HasMaxLength(20);
            entity.Property(e => e.Address).HasMaxLength(200);
            entity.Property(e => e.SocialLinks).HasMaxLength(500);
        });

        // Menu configuration
        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Url).HasMaxLength(200);
            entity.Property(e => e.Icon).HasMaxLength(50);            
            entity.HasOne(e => e.Parent)
                .WithMany(e => e.Children)
                .HasForeignKey(e => e.ParentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Banner configuration
        modelBuilder.Entity<Banner>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.ImageUrl).HasMaxLength(200);
            entity.Property(e => e.LinkUrl).HasMaxLength(200);
            entity.Property(e => e.Position).HasMaxLength(20);
            entity.Property(e => e.ButtonText).HasMaxLength(50);
        });
    }
} 