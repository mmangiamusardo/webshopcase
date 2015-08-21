using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Web.Http;
using System.Threading.Tasks;

namespace WebShopCase.Models
{
    public interface IProductRepository
    {
        IQueryable<ProductDTO> GetProducts();
        Product GetProduct(int id);
    }

    public interface IOrderRepository
    {
        //IQueryable<Order> GetOrdersByCustomer(int customerId);
        //Order GetOrder(int id);
        Task<int> Add(Order order);
    }

    public interface ICustomer
    {
        Customer GetCustomer(string mailAddress);
        int Add(Customer customer);
    }

    public interface ICart
    {
        //Cart GetCartById(int id);
    }
}