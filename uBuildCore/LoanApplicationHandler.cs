using System;
using Newtonsoft.Json.Linq;
using uBuildCore.Models;

namespace uBuildCore
{
    public class LoanApplicationHandler
    {

        public static ServiceResponse CheckEligibility(JObject data, int clientId = 0, string customerNo = null)
        {
            int currencyId = DbHandler.Instance.GetCurrencyId(data["currency"].ToString());
            var checkEligibilityRequest = new CheckEligibilityRequest();
            if (clientId > 0)
            {
                checkEligibilityRequest.ClientId = clientId;
            }
            if (customerNo != null)
            {
                checkEligibilityRequest.CustomerNo = customerNo;
            }
            checkEligibilityRequest.IncomeCurrencyId = currencyId;
            checkEligibilityRequest.TypeChecked = data["loanType"].ToStringOrEmpty().ToUpper() == "FULLHOUSE" ? 1 : 2;
            checkEligibilityRequest.LoanCurrencyId = currencyId;
            checkEligibilityRequest.LoanAmount = data["loanAmount"].ToObject<decimal>();
            checkEligibilityRequest.MonthlyIncome = data["monthlyIncome"].ToObject<decimal>();
            string loanTenureUnit = data["loanTenureUnit"].ToStringOrEmpty();
            if (loanTenureUnit == "Years")
            {
                checkEligibilityRequest.LoanTenorMonths = data["loanTenure"].ToObject<int>() * 12;
            }
            else
            {
                checkEligibilityRequest.LoanTenorMonths = data["loanTenure"].ToObject<int>();
            }
            if (checkEligibilityRequest.TypeChecked == 2)
            {
                checkEligibilityRequest.PhaseChecked = data["phase"].ToInteger();
            }
            var response = new ServiceResponse();
            try
            {
                var result = DbHandler.Instance.CheckLoanEligibility(checkEligibilityRequest);
                response.Status = "00";
                if (result.Qualified)
                {
                    response.Message = "You are qualified for a loan.\n";
                    response.Message += "Your monthly repayment amount is " + data["currency"].ToString() + " " + result.MonthlyRePmt + "\n";
                    response.Message += "Your have a borrowing capacity of  " + data["currency"].ToString() + " " + result.BorrowingCap;
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

        public static ServiceResponse ApplyForLoan(JObject data, ClientAuths client)
        {
            var response = new ServiceResponse();
            var loaApp = new LoanAppls();
            loaApp.ClientId = client.RecordId;
            string ulain = DbHandler.Instance.GenerateUlain();
            int currencyId = data["currency"].ToInteger();
            loaApp.AmtSought = data["AmtSought"].ToDecimal();
            loaApp.LoanApplTypeId = data["applyingFor"].ToInteger();
            loaApp.ApplSubmitDate = DateTime.Now;
            string customerNo = data["customerNo"].ToStringOrEmpty();
            loaApp.CustomerNo = string.IsNullOrEmpty(customerNo) ? null : customerNo;
            loaApp.ULAIN = ulain;
            loaApp.BuildingPhaseId = null;
            if (loaApp.LoanApplTypeId != 1)
            {
                loaApp.BuildingPhaseId = data["forPhase"].ToInteger(); ;
            }

            loaApp.PurposeofLoan = data["PurposeofLoan"].ToStringOrEmpty();
            loaApp.RepaymentMethodId = data["RepaymentMethod"].ToInteger();
            loaApp.ProtectionCover = true;
            loaApp.ProtectionSecured = true;
            loaApp.ProtectionSecurityType = data["ProtectionSecurityType"].ToStringOrEmpty();
            loaApp.ProtectionSecurityDetails = data["ProtectionSecurityDetails"].ToStringOrEmpty();
            string loanTenureUnit = data["loanTenureUnit"].ToStringOrEmpty();
            if (loanTenureUnit == "Years")
            {
                loaApp.LoanTermMonths = data["loanTenure"].ToObject<int>() * 12;
            }
            else
            {
                loaApp.LoanTermMonths = data["loanTenure"].ToObject<int>();
            }

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

        public static ServiceResponse ClientConfirm(string uLain)
        {
            var result = DbHandler.Instance.SaveClientConfirm(uLain);
            return new ServiceResponse()
            {
                data = result,
                Status = (result == 1).ToString()
            };
        }
    }
}
