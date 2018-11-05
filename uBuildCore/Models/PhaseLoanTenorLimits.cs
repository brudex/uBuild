using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
   public class PhaseLoanTenorLimits
    {
      public int RecordId{ get; set; }
      public int ForPhase{ get; set; }
      public int MinTenorMonths{ get; set; }
      public int MaxTenorMonths{ get; set; }
    }
}
