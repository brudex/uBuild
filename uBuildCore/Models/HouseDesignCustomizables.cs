using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
   public class HouseDesignCustomizables
    {
      public int RecordId{ get; set; }
      public string ItemDescription{ get; set; }
      public int CustomizableFnFsId { get; set; }
      public int HouseDesignId{ get; set; }
      public int FixturesAndFittingsId { get; set; }
      public int ItemCount{ get; set; }
      public decimal UnitCost { get; set; }
        public string ItemImage { get; set; }
        public bool IsDefault { get; set; }

    }
}
