using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
   public class Currencies
    {

      public int RecordId{ get; set; }
      public string ISOCode{ get; set; }
      public string ISOSign{ get; set; }
      public string SubUnit{ get; set; }
      public string SubUnits{ get; set; }
      public string MainUnit{ get; set; }
      public string MainUnits{ get; set; }
      public string Loanable{ get; set; }
    }
}
