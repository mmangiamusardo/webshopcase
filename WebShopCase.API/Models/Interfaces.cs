using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Web.Http;
using System.Threading.Tasks;
using WebShopCase.API;

namespace WebShopCase.Models
{
    public interface IProductRepository
    {
        IQueryable<ProductDTO> GetProducts();
        Product GetProduct(int id);
    }

    public interface IOrderRepository
    {
        IQueryable<OrderDTO> GetOrders();
        OrderDTO GetOrder(int id);
        int Add(Order order);
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