using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;

namespace WebShopCase.API.Utilities
{
    public class ConvertTo
    {
        public static string Base64(byte[] picture)
        {
            MemoryStream ms = new MemoryStream();
            ms.Write(picture, 78, picture.Length - 78); // strip out 78 byte OLE header (don't need to do this for normal images)
            string imageBase64 = Convert.ToBase64String(ms.ToArray());
            return string.Format("data:image/jpg;base64,{0}", imageBase64);
        }
    }
}