using System;

namespace uBuildCore.Models
{
    public class HouseDesigns
    { 
      public int RecordId{ get; set; }
      public string DesignName{ get; set; }
      public string FullDescription{ get; set; }
      public decimal BareDesignCost{ get; set; }
      public string DesignImage{ get; set; } 
      public string ISOCode { get; set; }
      public string ISOSign { get; set; }
      public string HouseImage { get; set; }

    }
}