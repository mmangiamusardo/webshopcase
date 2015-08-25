using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using WebShopCase.Models;
using WebShopCase.API.Utilities;
using System.Threading.Tasks;
using WebShopCase.API;

namespace WebShopCase.Models
{
    public class OrderRepository : IDisposable, IOrderRepository
    {
        private Entities  db = new Entities();

        public IQueryable<OrderDTO> GetOrders()
        {
            var orders = from o in db.Orders.Include(cus => cus.Customer).ToList()
                         select new OrderDTO()
                         {
                                OrderID = o.OrderID
                              , OrderDate = o.OrderDate
                              , RequiredDate = o.RequiredDate
                              , FirstName = o.ShipName
                              , Address = o.ShipAddress
                              , City = o.ShipCity
                              , Country = o.ShipCountry
                              , ShippedDate = o.ShippedDate
                              , ZipCode = o.ShipPostalCode
                              , ShipVia = o.ShipVia
                              , CustomerName = o.Customer.ContactName 
                         };
            return orders.AsQueryable();
        }

        public OrderDTO GetOrder(int id)
        {
            var o = db.Orders.Find(id);
            return new OrderDTO()
            {
                  OrderID = o.OrderID
                , OrderDate = o.OrderDate
                , RequiredDate = o.RequiredDate
                , FirstName = o.ShipName
                , Address = o.ShipAddress
                , City = o.ShipCity
                , Country = o.ShipCountry
                , ShippedDate = o.ShippedDate
                , ZipCode = o.ShipPostalCode
                , ShipVia = o.ShipVia
                , CustomerName = o.Customer.ContactName
            };
        }

        public int Add(Order newOrder)
        {
            db.Orders.Add(newOrder);
            return db.SaveChanges();
        }

        public int Add(OrderDetail newOrderDet)
        {
            db.OrderDetails.Add(newOrderDet);
            return db.SaveChanges();
        }

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }

    public class CustomerRepository : IDisposable, ICustomer
    {
        private Entities db = new Entities();

        public Customer GetCustomer(string mailAddress)
        {
            throw new NotImplementedException();
        }

        public int Add(Customer cust) {
            throw new NotImplementedException();
        }

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        
    }

    public class ProductRepository : IDisposable, IProductRepository
    {
        private Entities db = new Entities();

        public IQueryable<ProductDTO> GetProducts()
        {
            var prods = from p in db.Products.Include(cat => cat.Category).ToList()
                        select new ProductDTO()
                        {
                            ProductID = p.ProductID
                            ,
                            ProductName = p.ProductName
                            ,
                            UnitPrice = p.UnitPrice
                            ,
                            ProductPct = p.Picture
                            ,
                            CategoryID = p.CategoryID
                            ,
                            CategoryName = p.Category.CategoryName
                            //,CategoryPct = ConvertTo.Base64(p.Category.Picture)
                        };

            return prods.AsQueryable();
        }

        public Product GetProduct(int id)
        {
            return db.Products.Find(id);
        }

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}