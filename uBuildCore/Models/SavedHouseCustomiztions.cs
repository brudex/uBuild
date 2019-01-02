using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
  public  class SavedHouseCustomization
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public int HouseId { get; set; }
        public string Data { get; set; }
    }
}
