using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using uBuildCore.Models;

namespace uBuildCore
{
    public class CheckEligibilityRequest
    {

        public string CustomerNo { get; set; }
        public int TypeChecked { get; set; }
        public int? PhaseChecked { get; set; }
        public decimal MonthlyIncome { get; set; } //from frontend
        public int IncomeCurrencyId { get; set; }  //from frontend
        public decimal LoanAmount { get; set; } // from frontend
        public int LoanCurrencyId { get; set; } //from frontend
        public  int LoanTenorMonths { get; set; } //from frontend

       

      
    }
}
