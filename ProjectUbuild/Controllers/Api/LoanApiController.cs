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