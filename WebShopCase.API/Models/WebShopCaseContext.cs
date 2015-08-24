using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace WebShopCase.Models
{
    public class WebShopCaseContext : DbContext
    {
        public WebShopCaseContext() : base("name=WebShopCaseContext")
        {
            this.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        }

        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Category> Categories { get; set; }

        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Entity<Order>()
            .HasMany(o => o.OrderDetail)
            .WithRequired() // <- no param because not exposed end of relation,
                            // nc => nc.News would throw an exception
                            // because nc.News is in the base class
            .Map(a => a.MapKey("OrderId"));
        }
    }
}