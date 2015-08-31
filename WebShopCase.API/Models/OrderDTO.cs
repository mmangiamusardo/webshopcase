using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;



namespace WebShopCase.Models
{
    public class OrderDTO
    {
        public int OrderID { get; set; }
        public Nullable<System.DateTime> OrderDate { get; set; }
        public Nullable<System.DateTime> RequiredDate { get; set; }
        public Nullable<System.DateTime> ShippedDate { get; set; }
        public Nullable<int> ShipVia { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Address { get; set; }
        public string AddressNum { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string Country { get; set; }

        public string CustomerName { get; set; }

        [JsonProperty("OrderDetails")]
        public List<OrderDetailDTO> OrderDetails {get; set;}
    }

    public class OrderDetailDTO 
    {
        [JsonProperty("productId")]
        public int ProductId { get; set; }

        [JsonProperty("productPrice")]
        public decimal UnitPrice { get; set; }

        [JsonProperty("totalQty")]
        public short Quantity { get; set; }

        /*
        [JsonProperty("discount")]
        public float Discount { get; set; }
        */
    }
}
