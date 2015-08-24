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
using System.Xml;
using System.Xml.Linq;
using WebShopCase.API;

namespace WebShopCase.Models
{
    public class ProductRepositoryXML : IDisposable, IProductRepository
    {
        private List<Product> products;
        private XDocument productData;

        public ProductRepositoryXML() {
            products = new List<Product>();
            productData = XDocument.Load(HttpContext.Current.Server.MapPath("~/App_Data/Products.xml"));
            /*
            var billings = from billing in billingData.Descendants("item")
                           select new Billing((int)billing.Element("id"), billing.Element("customer").Value,
                           billing.Element("type").Value, (DateTime)billing.Element("date"),
                           billing.Element("description").Value, (int)billing.Element("hours"));
            allBillings.AddRange(billings.ToList<Billing>());
            */
        }

        public IQueryable<ProductDTO> GetProducts()
        {
            //return products.AsQueryable();
            return new List<ProductDTO>().AsQueryable();
        }

        public Product GetProduct(int id)
        {
            return products.Find(p => p.ProductID == id);
        }

   
       
        protected void Dispose(bool disposing)
        {
            /*
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
            */
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}