using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
    public class BoqModel
    {
        public int HouseDesignId { get; set; }
         public int    BoqId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string IsoCode { get; set; }

    }
}
