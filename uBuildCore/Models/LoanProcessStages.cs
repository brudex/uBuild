using System;


namespace uBuildCore.Models
{
    public class LoanProcessStages
    {
      public int RecordId{get;set;}
	  public string CustomerNo{get;set;}
      public string ULAIN{get;set;}
      public int LoanApplTypeId{get;set;}
      public int BuildingPhaseId{get;set;}
      public string PurposeofLoan{get;set;}
      public decimal AmtSought{get;set;}
      public int CurrencyId{get;set;}
      public string CurrencyCode{get;set;}
      public int LoanTermMonths{get;set;}
      public int RepaymentMethodId{get;set;}
      public string RepaymentMethod { get; set; }
      public bool ProtectionCover{get;set;}
      public bool ProtectionSecured{get;set;}
      public string ProtectionSecurityType{get;set;}
      public string ProtectionSecurityDetails{get;set;}
      public bool ApplSubmitted{get;set;}
      public DateTime ApplSubmitDate{get;set;}
	  public int LPS01InitialReview{get;set;}
      public int LPS02CreditAssessment{get;set;}
      public int LPS03RiskAssessment{get;set;}
      public int LPS04CreditApproval{get;set;}
      public int LPS05ClientConfirmation{get;set;}
      public int LPS06LoanDisbursement{get;set;}
      public string ProcessComment{get;set;}
      public DateTime LastProcessDate{get;set;}

    }
}
