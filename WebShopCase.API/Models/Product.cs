using System;
using System.ComponentModel.DataAnnotations;

namespace WebShopCase.Models
{
    public class Product
    {
        [Required]
        public int ProductID { get; set; }
        public string ProductName { get; set; }

        public string QuantityPerUnit { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<short> UnitsInStock { get; set; }
        public Nullable<short> UnitsOnOrder { get; set; }
        public Nullable<short> ReorderLevel { get; set; }
        public bool Discontinued { get; set; }
        public string Picture { get; set; }

        /*
        public Nullable<int> SupplierID { get; set; }
        public virtual Suppliers Suppliers { get; set; }
        */

        // Foreign Key
        public Nullable<int> CategoryID { get; set; }

        // Navigation property 
        public virtual Category Category { get; set; }
        
    }
}
