using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectUbuild.Models
{
    public class ApplyLoanViewModel
    {
        public string loanType { get; set; }
        public decimal monthlyIncome { get; set; }
        public decimal loanAmount { get; set; }
        public string currency { get; set; }
        public int currencyId { get; set; }
        public int loanTenure { get; set; }
        public string json { get; set; }
        public string phaseType { get; set; }
        public bool hasApplied { get; set; }

    }
    
}