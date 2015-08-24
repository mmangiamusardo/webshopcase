using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace WebShopCase.Models
{
    [Table("Orders")]
    [Bind(Exclude = "OrderID")]
    public class Order
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Order()
        {
            this.OrderDetail = new HashSet<OrderDetail>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderID { get; set; }

        public Nullable<System.DateTime> OrderDate { get; set; }
        public Nullable<System.DateTime> RequiredDate { get; set; }
        public Nullable<System.DateTime> ShippedDate { get; set; }
        
        public Nullable<decimal> Freight { get; set; }

        public string ShipName { get; set; }
        public string ShipAddress { get; set; }
        public string ShipCity { get; set; }
        public string ShipRegion { get; set; }
        public string ShipPostalCode { get; set; }
        public string ShipCountry { get; set; }

        // Foreign Key
        public string CustomerID { get; set; }
        // Navigation property
        public Customer Customer { get; set; }

        // Foreign Key
        //public virtual Employees Employees { get; set; }
        // Navigation property
        //public Nullable<int> EmployeeID { get; set; }

        public ICollection<OrderDetail> OrderDetail { get; set; }

        //public virtual Shipper Shipper { get; set; }
        //public Nullable<int> ShipVia { get; set; }
    }
}
