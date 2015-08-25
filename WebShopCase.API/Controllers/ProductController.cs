using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using WebShopCase.Models;
using WebShopCase.API.Utilities;

namespace WebShopCase.API.Controllers
{
    public class ProductController : ApiController
    {
        IProductRepository _repository;
        public ProductController(IProductRepository repository)
        {
            _repository = repository;
        }


        // GET: api/Product
        public IQueryable<ProductDTO> GetProducts()
        {
            return _repository.GetProducts();
        }

        // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {
            Product product = _repository.GetProduct(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
    }
}