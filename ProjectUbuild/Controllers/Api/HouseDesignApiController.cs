using System.Linq;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using ProjectUbuild.Models;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Controllers.Api
{
    public class HouseDesignApiController : ApiController
    {
        [System.Web.Mvc.HttpPost]
        public  ServiceResponse SaveHouseCustomization([FromBody]JObject value)
        {
            var response = new ServiceResponse();
            if (User.Identity.IsAuthenticated)
            {
                var email = User.Identity.GetEmailAdress();
                var clientAuth = DbHandler.Instance.GetClientAuthByEmail(email);
                var customization = new SavedHouseCustomization();
                customization.ClientId = clientAuth.RecordId;
                customization.HouseId = value["houseId"].ToInteger();
                customization.Data = value.ToString();
                DbHandler.Instance.SaveHouseCustomization(customization);
                response.Status = "00";
                response.Message = "Data successfully updated"; 
            }
            else
            {
                response = new ServiceResponse
                {
                    Status = "02",
                    Message = "Error Identifying user"
                };
            }
            return response;

        }

        [System.Web.Mvc.HttpPost]
        public ServiceResponse RetrievedSavedCustomization([FromBody]JObject value)
        {
            var response = new ServiceResponse();
            response.Status = "03";
            if (User.Identity.IsAuthenticated)
            {
                var email = User.Identity.GetEmailAdress();
                int houseId = value["houseId"].ToInteger();

                var clientAuth = DbHandler.Instance.GetClientAuthByEmail(email);
               
                var customization = DbHandler.Instance.GetSavedHouseCustomization(clientAuth.RecordId, houseId);
                if (customization != null)
                {
                    response.Status = "00";
                    response.data = JObject.Parse(customization.Data);
                }
                else
                {
                    response.Status = "02"; 
                }
            }
            return response;

        }


        [System.Web.Mvc.HttpPost]
        public ServiceResponse BillOfQuantities([FromBody]JObject value)
        {
            var response = new ServiceResponse();
            int houseId = value["houseId"].ToInteger();
            var boqs = DbHandler.Instance.GetHouseDesignBoQs(houseId);
            response.Status = "03";
            if (boqs.Any())
            {
                response.Status = "00";
                response.data = boqs;
            }
            return response;

        }




    }
}
