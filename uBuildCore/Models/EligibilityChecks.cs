using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
    public class EligibilityChecks
    { 
        public int RecordId { get; set; }
	    public int ClientId { get; set; }
        public string CustomerNo { get; set; }
        public int TypeChecked { get; set; }
        public int PhaseChecked { get; set; }
        public decimal MonthlyIncome { get; set; }
        public string IncomeCurrencyId { get; set; }
        public decimal LoanAmount { get; set; }
        public int LoanCurrencyId { get; set; }
        public decimal InterestRate { get; set; }
        public int LoanTenorMonths { get; set; }
        public decimal BorrowingCap { get; set; }
        public decimal MonthlyRePmt { get; set; }
        public bool Qualified { get; set; }
        public DateTime DateChecked { get; set; }


    }
}
