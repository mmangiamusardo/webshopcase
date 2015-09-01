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
        private List<ProductDTO> products;
        private XDocument productData;

        public ProductRepositoryXML() {
            
            products = new List<ProductDTO>();
            productData = XDocument.Load(HttpContext.Current.Server.MapPath("~/App_Data/Products.xml"));
            
            var dtos = from product in productData.Descendants("ProductDTO")
                       select new ProductDTO()
                       {
                           ProductID = (int)product.Element("ProductID")
                           ,
                           ProductName = product.Element("ProductName").Value
                           ,
                           UnitPrice = (decimal)product.Element("UnitPrice")
                           ,
                           ProductPct = product.Element("ProductPct").Value
                       };

            products.AddRange(dtos.ToList<ProductDTO>());
        }

        public IQueryable<ProductDTO> GetProducts()
        {
            return products.AsQueryable();
        }

        public ProductDTO GetProduct(int id)
        {
            XElement node = productData.Root.Elements("ProductDTO")
                .Where(i => (int)i.Element("ProductID") == id).FirstOrDefault();

            if (node == null)
                return new ProductDTO();

            return new ProductDTO()
            {
                ProductID = Convert.ToInt32(node.Element("ProductID").Value)
                ,
                ProductName = node.Element("ProductName").Value
                ,
                QuantityPerUnit = node.Element("QuantityPerUnit").IsEmpty ? String.Empty : node.Element("QuantityPerUnit").Value
                ,
                UnitPrice = (decimal)node.Element("UnitPrice")
                ,
                ProductPct = node.Element("ProductPct").Value
                ,
                CategoryName = node.Element("CategoryName").IsEmpty ? String.Empty : node.Element("CategoryName").Value
                ,
                CategoryPct = node.Element("CategoryPct").Value
                ,
                UnitsInStock = node.Element("UnitsInStock").IsEmpty ? (short)0 : (short)node.Element("UnitsInStock")
                ,
                UnitsOnOrder = node.Element("UnitsOnOrder").IsEmpty ? (short)0 : (short)node.Element("UnitsOnOrder")
            };
        }

   
       
        protected void Dispose(bool disposing)
        {
            
            if (disposing)
            {
                if (products != null)
                {
                    products = null;
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