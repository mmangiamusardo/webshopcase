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
        public string ProductPct { get; set; }

        public string CategoryName { get; set; }
        public string CategoryPct { get; set; }

        public Nullable<short> UnitsInStock { get; set; }
        public Nullable<short> UnitsOnOrder { get; set; }

    }
}
