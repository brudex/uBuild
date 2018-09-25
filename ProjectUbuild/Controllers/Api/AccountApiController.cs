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

        public ServiceResponse GetAccountProfile()
        {

//            vm.applyModel.accountNumber
//                        vm.applyModel.customerNo
//                        vm.applyModel.applyingFor
//                        vm.applyModel.forPhase
//                        vm.applyModel.AmtSought
//                        vm.applyModel.RepaymentMethod
//                        vm.applyModel.RepaymentOther
//                        vm.applyModel.PurposeofLoan
//                        vm.applyModel.loanTenure
//                        vm.applyModel.loanTenureUnit
//
//            var clientAuth = User.GetUbuildClient();
//            var clientInfo = DbHandler.Instance.GetGhlClientInfoByClientId(clientAuth.RecordId);
//            var jobj 
//            var dt = new 
//            {
//                
//            }
//
//
//            var infos = JsonConvert.DeserializeObject<ClientInfos>(value.ToString());
//            infos.CreatedDate = DateTime.Now;
//            infos.ClientId = clientAuth.RecordId;
//            DbHandler.Instance.SaveGhlClientInfos(infos);
            var response = new ServiceResponse
            {
                Status = "00",
                Message = "Data successfully updated"
            };
            return response;

        }
    }
}
