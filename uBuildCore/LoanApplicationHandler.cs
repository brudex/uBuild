using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using uBuildCore.Models;

namespace uBuildCore
{
    public class LoanApplicationHandler
    {

        public static ServiceResponse CheckEligibility(JObject data)
        { 
            int currencyId = DbHandler.Instance.GetCurrencyId(data["currency"].ToString());
            var checkEligibilityRequest = new CheckEligibilityRequest();
            checkEligibilityRequest.IncomeCurrencyId = currencyId;
            checkEligibilityRequest.TypeChecked = data["loanType"].ToStringOrEmpty().ToUpper() == "FULLHOUSE" ? 1 : 2;
            checkEligibilityRequest.LoanCurrencyId = currencyId;
            checkEligibilityRequest.LoanAmount = data["loanAmount"].ToObject<decimal>();
            checkEligibilityRequest.MonthlyIncome = data["monthlyIncome"].ToObject<decimal>();
            checkEligibilityRequest.LoanAmount = data["loanAmount"].ToObject<decimal>();
            checkEligibilityRequest.LoanTenorMonths = data["loanTenure"].ToObject<int>();
            if (string.IsNullOrEmpty(data["phase"].ToStringOrEmpty()))
            {
                checkEligibilityRequest.PhaseChecked = 1;
            }
            var response = new ServiceResponse();
            try
            {
                var result = DbHandler.Instance.CheckLoanEligibility(checkEligibilityRequest);

                response.Status = "00";
                if (result.Qualified)
                {
                    response.Message = "You are qualified for a loan. \n";
                    response.Message += "Your monthly repayment amount is "+ data["currency"].ToString()+" " + result.MonthlyRePmt+"\n";
                    response.Message += "Your have a borrowing capacity of  "+ data["currency"].ToString()+" " + result.BorrowingCap;
                }
                else
                {
                    response.Status = "01";
                    response.Message = "Sorry according to the information provided you are not qualified";
                }
                response.data = result;
            }
            catch (Exception ex)
            {
                response.Status = "99";
                response.Message = "Error checking eligibility";
                Logger.Error("Error checking eligiblity", ex);
            }
            return response;

             

        }

        public static ServiceResponse ApplyForLoan(JObject data,ClientAuths client)
        {


//            request:
//            currency: "GHS"
//loanAmount: "1000"
//loanInterestRate: "12"
//loanTenure: "12"
//loanType: "Fullhouse"
//monthlyIncome: "14300"
//phase: ""
//__proto__: Object
//response:
//BorrowingCap: 0
//ClientId: 0
//CustomerNo: null
//DateChecked: "2018-09-24T00:00:00"
//IncomeCurrencyId: "1"
//InterestRate: 25
//LoanAmount: 1000
//LoanCurrencyId: 1
//LoanTenorMonths: 12
//MonthlyIncome: 14300
//MonthlyRePmt: 0
//PhaseChecked: 1
//Qualified: true
//RecordId: 5
//TypeChecked: 1

            var response = new ServiceResponse();
            
            var loaApp = new LoanAppls();
            string customerNo = string.Empty;
            string ulain = string.Empty;
            int phaseId = 0;
            int currencyId = DbHandler.Instance.GetCurrencyId(data["request"]["currency"].ToString());
            loaApp.AmtSought = data["request"]["loanAmount"].ToDecimal();
            loaApp.ApplFor = client.RecordId;
            loaApp.ApplSubmitDate= DateTime.Now;

            loaApp.CustomerNo = customerNo;
            loaApp.ULAIN = ulain;
            loaApp.ForPhase = phaseId;
//            loaApp.PurposeofLoan = data["request"]["loanPurpose"].ToStringOrEmpty(); //get from ui
//            loaApp.RepaymentMethod = data["request"]["paymentMethod"];//get from ui
//            loaApp.ProtectionCover = true;
//            loaApp.ProtectionSecured = true;
//            loaApp.ProtectionSecurityType = data["request"]["loanAmount"] 
//            loaApp.ProtectionSecurityDetails = data["request"]["loanAmount"]
//            loaApp.LoanTermMonths = data["request"]["loanTenure"].ToInteger()*12;
            loaApp.CurrencyId = currencyId;
            loaApp.ApplSubmitted = true;
            loaApp.ApplSubmitDate = DateTime.Now;
            loaApp.CreatorId = client.RecordId;
            loaApp.CreatorName = client.FullName;
            loaApp.CreatedDate = DateTime.Now;
            DbHandler.Instance.SaveLoanApplication(loaApp);

            return response;



        }
    }
}
