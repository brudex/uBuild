using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
    public class LoanInterestRates
    {
 	   public int RecordId { get; set; }
	   public string LoanCurrencyId { get; set; }
	   public string InterestRate { get; set; }
    }
}
