using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ProjectUbuild.Models;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Controllers.Api
{
    public class AccountApiController : ApiController
    {
        [System.Web.Mvc.HttpPost]
        public  ServiceResponse SaveProfile([FromBody]JObject value)
        {
            var email = User.Identity.Name;
            var clientAuth = DbHandler.Instance.GetClientAuthByEmail(email);
            var infos = JsonConvert.DeserializeObject<ClientInfos>(value.ToString());
            infos.CreatedDate = DateTime.Now;
            infos.ClientId = clientAuth.RecordId;
             DbHandler.Instance.SaveGhlClientInfos(infos);
            var response = new ServiceResponse
            {
                Status = "00",
                Message = "Data successfully updated"
            };
            return response;

        }

        [System.Web.Mvc.HttpPost]
        public ServiceResponse AccountProfile([FromBody]JObject data)
        { 
            var clientAuth = User.GetUbuildClient();
            bool fullData = false;
            if (data != null)
            {
                fullData = data["allData"] != null && data["allData"].ToBoolean();
            }
            return AccountProfileHandler.GetAccountProfile(clientAuth,fullData);

        }


        [System.Web.Mvc.HttpPost]
        public ServiceResponse SendOtpByAcctNo([FromBody]JObject data)
        {
            var clientAuth = User.GetUbuildClient();
            return AccountProfileHandler.SendOtp(data, clientAuth);
        }

        [System.Web.Mvc.HttpPost]
        public ServiceResponse ValidateOtpByAcctNo([FromBody]JObject data)
        {
            var clientAuth = User.GetUbuildClient();
            return AccountProfileHandler.ValidateOtp(data, clientAuth);
        }


    }
}
