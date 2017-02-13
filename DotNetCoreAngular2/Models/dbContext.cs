using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using angularapp.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace DotNetCoreAngular2.Models
{
    public partial class dbContext : DbContext
    {
        public dbContext(DbContextOptions<dbContext> options) : base(options)
        { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=SPT-CPU-0276;Database=DataBaseDotnetCore;User Id=sa;Password=Sql2012;Trusted_Connection=True;");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.Email)
                    .HasColumnName("Email")
                    .HasColumnType("varchar(250)");

                entity.Property(e => e.Name)
                    .HasColumnName("Name")
                    .HasColumnType("varchar(250)");
            });
        }

        public virtual DbSet<Employee> Employee { get; set; }

    }
}
