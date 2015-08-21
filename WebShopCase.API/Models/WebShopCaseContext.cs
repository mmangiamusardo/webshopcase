using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Data.Entity.Infrastructure;

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
        public virtual DbSet<Customer> Customer { get; set; }

    }
}