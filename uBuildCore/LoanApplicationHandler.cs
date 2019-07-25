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
                    response.Message = "You are qualified for this loan.\n";
                    response.Message += "Your monthly repayment is " + data["currency"].ToString() + " " + result.MonthlyRePmt + " for the next " + checkEligibilityRequest.LoanTenorMonths + " month(s) \n";
                    response.Message += "You may borrow up to " + data["currency"].ToString() + " " + result.BorrowingCap;
                }
                else
                {
                    response.Status = "01";
                    response.Message = "Sorry, the information you provided does not qualify you for this loan.Enter a lower loan amount or increase the loan tenure and try again.";
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

        public static ServiceResponse ClientConfirm(string uLain, bool accepted)
        {
            var result = DbHandler.Instance.SaveClientConfirm(uLain, true);
            return new ServiceResponse()
            {
                data = result,
                Status = (result == 1).ToString(),
                Message = "Data successfully updated"
            };
        }


        public static ServiceResponse UpdatedUserAcceptedTerms(JObject data)
        {
            var response = new ServiceResponse();
            bool acceptedTerms = data["termsAccepted"].ToBoolean();
            int recordId = data["recordId"].ToInteger();
            var updated = DbHandler.Instance.UpdateLoanTermsAccepted(recordId, acceptedTerms);
            response.Status = updated ? "00" : "03";
            if (updated)
            {
                response.Message = "Data successfully updated ";
            }
            else
            {
                response.Message = "There was an error please try again later";
            }

            return response;

        }
    }
}
