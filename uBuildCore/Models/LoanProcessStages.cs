using System;
using System.Collections.Generic;
using System.Linq;


namespace uBuildCore.Models
{
    public class LoanProcessStages
    {
      private   static List<LoanProcStageStates> stageStates = null;
        
        public LoanProcessStages()
        {
        }

        public int RecordId { get; set; }
        public string CustomerNo { get; set; }
        public string ULAIN { get; set; }
        public int LoanApplTypeId { get; set; }
        public int BuildingPhaseId { get; set; }
        public string PurposeofLoan { get; set; }
        public decimal AmtSought { get; set; }
        public int CurrencyId { get; set; }
        public string CurrencyCode { get; set; }
        public int LoanTermMonths { get; set; }
        public int RepaymentMethodId { get; set; }
        public string RepaymentMethod { get; set; }
        public bool ProtectionCover { get; set; }
        public bool ProtectionSecured { get; set; }
        public string ProtectionSecurityType { get; set; }
        public string ProtectionSecurityDetails { get; set; }
        public bool ApplSubmitted { get; set; }
        public DateTime ApplSubmitDate { get; set; }
        public int LPS01InitialReview { get; set; }
        public int LPS02CreditAssessment { get; set; }
        public int LPS03RiskAssessment { get; set; }
        public int LPS04CreditApproval { get; set; }
        public int LPS05ClientConfirmation { get; set; }
        public int LPS06LoanDisbursement { get; set; }
        public string ProcessComment { get; set; }
        public DateTime? LastProcessDate { get; set; }

        public string LPS01InitialReviewDesc()
        {
            return GetStatusName(LPS01InitialReview);
        }

        public string LPS02CreditAssessmentDesc()
        {
            return GetStatusName(LPS02CreditAssessment);
        }

        public string LPS03RiskAssessmentDesc()
        {
            return GetStatusName(LPS03RiskAssessment);
        }

        public string LPS04CreditApprovalDesc()
        {
            return GetStatusName(LPS04CreditApproval);
        }

        public string LPS05ClientConfirmationDesc()
        {
            return GetStatusName(LPS05ClientConfirmation);
        }

        public string LPS06LoanDisbursementDesc()
        {
            return GetStatusName(LPS06LoanDisbursement);
        }

        public string GetStatusName(int approvalCode)
        {
            
            if (stageStates == null)
            {
                stageStates = DbHandler.Instance.GetList<LoanProcStageStates>();
            }
            var state = stageStates.FirstOrDefault(x => x.RecordId == approvalCode);
            if (state != null)
            {
                return state.StateName;
            }
            return "" + approvalCode;
        }

        public string GetApplTypeName()
        {
            return LoanApplTypeId == 1 ? "Full House" : "Phase";
        }

        public string GetFinalStatus()
        {
            var numList = new List<int>() {3, 4};
            if (numList.IndexOf(LPS06LoanDisbursement) > -1)
            {
                return GetStatusName(LPS06LoanDisbursement);
            }
            if (numList.IndexOf(LPS05ClientConfirmation) > -1)
            {
                return GetStatusName(LPS05ClientConfirmation);
            }
            if (numList.IndexOf(LPS04CreditApproval) > -1)
            {
                return GetStatusName(LPS04CreditApproval);
            }
            if (numList.IndexOf(LPS03RiskAssessment) > -1)
            {
                return GetStatusName(LPS03RiskAssessment);
            }
            if (numList.IndexOf(LPS02CreditAssessment) > -1)
            {
                return GetStatusName(LPS02CreditAssessment);
            }
            if (numList.IndexOf(LPS01InitialReview) > -1)
            {
                return GetStatusName(LPS01InitialReview);
            }

            return "N/A";
        }
    }
}
