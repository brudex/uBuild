using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using ProjectUbuild.Models;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Controllers.Api
{
    public class LoanApiController : ApiController
    {
        [System.Web.Mvc.HttpGet]
        public List<HouseImage> GetHouseImages()
        {
           return DbHandler.Instance.GetHouseImages();
        }
        
        [System.Web.Mvc.HttpGet]
        public List<FittingsFixtures> GetFittingsFixtures()
        {
            return DbHandler.Instance.GetFittingsFixtures();
        }


        [System.Web.Mvc.HttpPost]
        public ServiceResponse CheckLoanEligibility([FromBody]JObject data)
        {
            int currencyId = DbHandler.Instance.GetCurrencyId(data["currency"].ToString());
            //var clientAuth = User.GetUbuildClient();
            var handler = new EligibilityCheckHandler();
            handler.IncomeCurrencyId = currencyId;
            handler.TypeChecked = data["loanType"].ToStringOrEmpty().ToUpper() == "FULLHOUSE" ? 1 : 2;
            handler.LoanCurrencyId = currencyId;
            handler.LoanAmount = data["loanAmount"].ToObject<decimal>();
            handler.MonthlyIncome = data["monthlyIncome"].ToObject<decimal>();
            handler.LoanAmount = data["loanAmount"].ToObject<decimal>();
            handler.LoanTenorMonths = data["loanTenure"].ToObject<int>();
            if (string.IsNullOrEmpty(data["phase"].ToStringOrEmpty()))
            {
                handler.PhaseChecked = 1;
            }
            var response = new ServiceResponse();
            try
            {
                var result = handler.CheckEligibility();
               
                response.Status = "00";
                if (result.Qualified)
                {
                    response.Message = "You are qualified for a loan<br/>";
                    response.Message += "Your monthly repayment amount is " + result.MonthlyRePmt;
                    response.Message += "Your have a borrowing capacity of  " + result.BorrowingCap;
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
                Logger.Error("Error checking eligiblity",ex);
            }
            return response;


        }


    }
}