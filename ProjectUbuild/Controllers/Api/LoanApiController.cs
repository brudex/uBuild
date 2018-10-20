using System.Collections.Generic;
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
        public List<HouseDesigns> GetHouseDesigns()
        {
            return DbHandler.Instance.GetHouseDesigns();
        }

        [System.Web.Mvc.HttpGet]
        public List<HouseDesignCustomizables> GetHouseDesignCustomizibles(int id)
        {
            return DbHandler.Instance.GetDesignCustomizablesByHouseId(id);
        }

        [System.Web.Mvc.HttpGet]
        public List<FixturesAndFittings> GetFittingsFixtures()
        {
            return DbHandler.Instance.GetFittingsFixtures();
        }


        [System.Web.Mvc.HttpGet]
        public List<LoanAmountCurrencyLimits> GetLoanAmountCurrencyLimits()
        {
            return DbHandler.Instance.GetList<LoanAmountCurrencyLimits>();
        }

        [System.Web.Mvc.HttpGet]
        public List<RepaymentMethods> GetRepaymentMethods()
        {
            return DbHandler.Instance.GetRepaymentMethods();
        }

        [System.Web.Mvc.HttpGet]
        public List<Currencies> GetCurrencies()
        {
            return DbHandler.Instance.GetCurrencies();
        }

        [System.Web.Mvc.HttpGet]
        public List<LoanApplTypes> GetLoanApplTypes()
        {
            return DbHandler.Instance.GetLoanApplTypes();
        }

        [System.Web.Mvc.HttpGet]
        public List<BuildingPhases> GetBuildingPhases()
        {
            return DbHandler.Instance.GetBuildingPhases();
        }


        [System.Web.Mvc.HttpGet]
        public List<LoanInterestRates> GetLoanInterestRates()
        {
            return DbHandler.Instance.GetLoanInterestRates();
        }

        

        [System.Web.Mvc.HttpPost]
        public ServiceResponse CheckLoanEligibility([FromBody]JObject data)
        {
            var response = new ServiceResponse();
            if (User.Identity.IsAuthenticated)
            {
                var clientAuth = User.GetUbuildClient();
                var clientInfo = clientAuth.GetClientInfo();
                string customerNo = (clientInfo != null) ? clientInfo.CustomerNo : null;
                response = LoanApplicationHandler.CheckEligibility(data, clientAuth.RecordId, customerNo);
            }
            else
            {
                response = LoanApplicationHandler.CheckEligibility(data);
            }
            return response;

        }

        [System.Web.Mvc.HttpPost]
        public ServiceResponse ApplyForLoan([FromBody]JObject data)
        { 
            var clientAuth = User.GetUbuildClient();
            return LoanApplicationHandler.ApplyForLoan(data, clientAuth);
        }



    }
}