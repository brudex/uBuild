using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
    public class LoanAmountCurrencyLimits
    {
      public string RecordId{ get; set; }
      public string LoanCurrencyId{ get; set; }
      public string MinTenorMonths{ get; set; }
      public string MaxTenorMonths{ get; set; }
      public string MinLoanAmount{ get; set; }
      public string MaxLoanAmount{ get; set; }
    }
}
