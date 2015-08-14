using System;
using System.Collections.Generic;

namespace WebShopCase.Models
{
    public class ProductDTO
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }

        public string QuantityPerUnit { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<short> UnitsInStock { get; set; }
        public Nullable<short> UnitsOnOrder { get; set; }
        public Nullable<short> ReorderLevel { get; set; }
        public bool Discontinued { get; set; }

        /*
        public Nullable<int> SupplierID { get; set; }
        public virtual Suppliers Suppliers { get; set; }
        */

        public Nullable<int> CategoryID { get; set; }
        public string CategoryName { get; set; }
        public byte[] CategoryPct { get; set; }
        
        //public virtual Category Category { get; set; }
        
    }
}
