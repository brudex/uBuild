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
        public List<HouseDesignCustomizables> GetHouseDesignCustomizibles()
        {
            return DbHandler.Instance.GetHouseDesignCustomizables();
        }

        [System.Web.Mvc.HttpGet]
        public List<FittingsFixtures> GetFittingsFixtures()
        {
            return DbHandler.Instance.GetFittingsFixtures();
        }

        [System.Web.Mvc.HttpGet]
        public List<FittingsFixtures> GetRepaymentMethods()
        {
            return DbHandler.Instance.GetFittingsFixtures();
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

        [System.Web.Mvc.HttpPost]
        public ServiceResponse CheckLoanEligibility([FromBody]JObject data)
        {
            return LoanApplicationHandler.CheckEligibility(data); 
        }

        [System.Web.Mvc.HttpPost]
        public ServiceResponse ApplyForLoan([FromBody]JObject data)
        { 
            var clientAuth = User.GetUbuildClient();
            return LoanApplicationHandler.ApplyForLoan(data, clientAuth);
        }

        


    }
}