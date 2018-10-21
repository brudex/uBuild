using System;

namespace uBuildCore.Models
{
    public class LoanProcStages
    {
        public int RecordId { get; set; }
        public string ULAIN { get; set; }
        public int InitialReview { get; set; }
        public int CreditAssessment { get; set; }
        public int RiskAssessment { get; set; }
        public int CreditApproval { get; set; }
        public int ClientConfirmation { get; set; }
        public int LoanDisbursement { get; set; }
        public string DecisionComment { get; set; }
        public int CreatorId { get; set; }
        public string CreatorName { get; set; }
            public DateTime CreatedDate { get; set; }

        public int AuthorizerId { get; set; }


        public string AuthorizerName { get; set; }

        public DateTime AuthorizedDate { get; set; }
    }
}