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
            var response = new ServiceResponse();
            var loaApp = new LoanAppls();
            loaApp.ClientId = client.RecordId;
            string ulain = DbHandler.Instance.GenerateUlain();
            int phaseId = 0; //todo get phaseId from ui
            int currencyId = DbHandler.Instance.GetCurrencyId(data["currency"].ToString());
            loaApp.AmtSought = data["AmtSought"].ToDecimal();
            loaApp.ApplFor = 1;// client.RecordId;//fkey applTypes
            loaApp.ApplSubmitDate= DateTime.Now;
            loaApp.CustomerNo = null;//data["customerNo"].ToStringOrEmpty(); //fkey
            loaApp.ULAIN = ulain;
            loaApp.ForPhase = null;
            loaApp.PurposeofLoan = data["PurposeofLoan"].ToStringOrEmpty();
            loaApp.RepaymentMethod = 1;//data["RepaymentMethod"].ToInteger(); //fkey
            loaApp.ProtectionCover = true;
            loaApp.ProtectionSecured = true;
            loaApp.ProtectionSecurityType = data["ProtectionSecurityType"].ToStringOrEmpty();
            loaApp.ProtectionSecurityDetails = data["ProtectionSecurityDetails"].ToStringOrEmpty();
            loaApp.LoanTermMonths = data["loanTenure"].ToInteger()*12;
            loaApp.CurrencyId = currencyId;
            loaApp.ApplSubmitted = true;
            loaApp.ApplSubmitDate = DateTime.Now;
            loaApp.CreatorId = client.RecordId;
            loaApp.CreatorName = client.FullName();
            loaApp.CreatedDate = DateTime.Now;
            DbHandler.Instance.SaveLoanApplication(loaApp);
            response.Status = "00";
            response.Message = ulain;
            return response;  

        }
    }
}
