using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Models
{
    public class MyApplicationsViewModel
    {
        public List<LoanProcessStages> loanApplications { get; set; }
        public LoanProcessStages currentLoanApplication { get; set; }

       public MyApplicationsViewModel(int clientId)
       {
           var ulains = DbHandler.Instance.GetClientLoanProcStages(clientId, "C");
           loanApplications = DbHandler.Instance.GetLoanProcStagesByUlains(ulains);
           ulains = DbHandler.Instance.GetClientLoanProcStages(clientId, "U");
           currentLoanApplication = DbHandler.Instance.GetLoanProcStagesByUlains(ulains).FirstOrDefault();
       }
        


    }
}