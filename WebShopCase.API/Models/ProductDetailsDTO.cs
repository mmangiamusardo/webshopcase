using System;
using System.Collections.Generic;

namespace WebShopCase.Models
{
    public class ProductDetailsDTO
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }

        public string QuantityPerUnit { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public string ProductPct { get; set; }

        /*
        public Nullable<int> SupplierID { get; set; }
        public virtual Suppliers Suppliers { get; set; }
        */

        public Nullable<int> CategoryID { get; set; }
        public string CategoryName { get; set; }

        public string CategoryPct { get; set; }
        //public virtual Category Category { get; set; }
        
    }
}
