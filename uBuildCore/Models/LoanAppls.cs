using System;

namespace uBuildCore.Models
{
    public class LoanAppls {
 
    public int RecordId { get; set; }
	public int ClientId { get; set; }
	public string CustomerNo { get; set; }
	public string ULAIN { get; set; }
	public int ApplFor { get; set; }
	public int? ForPhase { get; set; }
	public string PurposeofLoan { get; set; }
    public decimal AmtSought { get; set; }
    public int RepaymentMethod { get; set; }
    public bool ProtectionCover { get; set; }
    public bool ProtectionSecured { get; set; }
    public string ProtectionSecurityType { get; set; }
    public string ProtectionSecurityDetails { get; set; }
    public int LoanTermMonths { get; set; }
    public int CurrencyId { get; set; }
    public bool ApplSubmitted { get; set; }
    public DateTime? ApplSubmitDate { get; set; }
    public int CreatorId { get; set; }
    public string CreatorName { get; set; }
    public DateTime? CreatedDate { get; set; }
    public int? AuthorizerId { get; set; }
    public string AuthorizerName { get; set; }
    public DateTime? AuthorizedDate { get; set; }



    }
}