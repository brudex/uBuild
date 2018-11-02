using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Services.Description;
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
             
            if (value["isFinalUpate"].ToBoolean() == true)
            {
                var infos = JsonConvert.DeserializeObject<ClientInfos>(value.ToString());
                infos.CreatedDate = DateTime.Now;
                infos.ClientId = clientAuth.RecordId;
                infos.CreatorId = 0;
                infos.CreatorName = "SYSTEM";
                DbHandler.Instance.SaveGhlClientInfos(infos);
                
            }
            else
            {
                var userId = clientAuth.RecordId;
                var uncompleted= new UncompletedProfile();
                uncompleted.ClientId = userId;
                uncompleted.Data = value.ToString();
                DbHandler.Instance.SaveUnCompletedProfile(uncompleted);
            }
           
            var response = new ServiceResponse
            {
                Status = "00",
                Message = "Data successfully updated"
            };
            return response;

        }

        [System.Web.Mvc.HttpGet]
        public ServiceResponse GetUncompletedProfile()
        {
            var email = User.Identity.Name;
            var clientAuth = DbHandler.Instance.GetClientAuthByEmail(email);
            var response = new ServiceResponse();
            var uncompleted = DbHandler.Instance.GetUncompletedProfile(clientAuth.RecordId);
            if (uncompleted != null)
            {
                response.Status = "00";
                response.data = JObject.Parse(uncompleted.Data);

            }
            else
            {
                response.Status = "03";
            }
            
            return response;

        }


        [Authorize]
        [System.Web.Mvc.HttpPost]
        public ServiceResponse AccountProfile([FromBody]JObject data)
        { 
            var clientAuth = User.GetUbuildClient();
            bool fullData = false;
            string acctNo= String.Empty;
            if (data != null)
            {
                fullData = data["allData"].ToStringOrEmpty().Equals("true",StringComparison.InvariantCultureIgnoreCase);
                if (fullData)
                {
                    acctNo = data["acctNo"].ToStringOrEmpty();
                }
            }
            return AccountProfileHandler.GetAccountProfile(clientAuth,acctNo,fullData); 
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
