using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebShopCase.Models;
using System.Web.Http.Cors;

using WebShopCase.API;

namespace WebShopCase.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OrderController : ApiController
    {
        IOrderRepository _ordRep;
        public OrderController(IOrderRepository ordRep)
        {
            _ordRep = ordRep;
        }

        // GET: api/Order
        public IQueryable<OrderDTO> GetOrder()
        {
            return _ordRep.GetOrders();
        }

        // GET: api/Order/5
        //[ResponseType(typeof(OrderDTO))]
        public IHttpActionResult GetOrder(int id)
        {
            OrderDTO order = _ordRep.GetOrder(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }


        // POST: api/Order
        //[ResponseType(typeof(Order))]
        public IHttpActionResult PostOrder(OrderDTO dto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            OrderDetail d = new OrderDetail()
            {
                //OrderID = o.OrderID,
                ProductID = 1,
                Quantity = 1,
                UnitPrice = 1,
                Discount = 0.0f
            };

            ICollection<OrderDetail> details = new List<OrderDetail>();
            details.Add(d);


            Order o = new Order()
            {
                ShipName = String.Format("{0} {1}", dto.FirstName, dto.LastName),
                ShipAddress = String.Format("{0} {1}", dto.Address, dto.AddressNum),
                ShipCity = dto.City,
                ShipPostalCode = dto.ZipCode,
                ShipCountry = dto.Country,
                ShippedDate = DateTime.Now.AddDays(2.5),

                RequiredDate = DateTime.Now,
                OrderDate = DateTime.Now,

                CustomerID = "ALFKI",

                ShipVia = 1,

                OrderDetails = details
            };

            _ordRep.Add(o);
            dto.OrderID = o.OrderID;
            return Ok(dto);
            //return CreatedAtRoute("DefaultApi", new { id = dto.OrderID }, dto);
        }
    }
}