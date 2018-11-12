using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using ProjectUbuild.Models;
using ProjectUbuild.Properties;
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
        public List<PhaseLoanTenorLimits> GetPhaseLoanTenorLimits()
        {
            return DbHandler.Instance.GetList<PhaseLoanTenorLimits>();
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
        public HttpResponseMessage UploadDocument(string clientUlain)
        {
            var dict = new Dictionary<string, object>();
            try
            {
                var httpRequest = HttpContext.Current.Request;

                var formValues = GetFormValues(httpRequest.Form);
                foreach (string file in httpRequest.Files)
                {
                    var response = Request.CreateResponse(HttpStatusCode.Created);

                    var postedFile = httpRequest.Files[file];
                    if (postedFile != null && postedFile.ContentLength > 0)
                    {
                        var tstamp = DateTime.Now.ToString("yyyyMMddHHmmss");
                        var MaxContentLength = 1024 * 1024 * 1; //Size = 1 MB  
                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png", ".jpeg" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {
                            var message = string.Format("Please Upload image of type .jpg,.gif,.png,.jpeg");
                            dict.Add("error", message);
                            return Request.CreateResponse(HttpStatusCode.BadRequest, dict);
                        }
                        else
                        {
                            try
                            {
                                var ulainPath =
                                    HttpContext.Current.Server.MapPath(Settings.Default.DocUploadUrl + "/" + clientUlain);
                                Directory.CreateDirectory(ulainPath);

                                var filePath = HttpContext.Current.Server.MapPath(Settings.Default.DocUploadUrl + "/" + clientUlain + "/" + tstamp + postedFile.FileName);
                                postedFile.SaveAs(filePath);

                                var data = new LoanDocuments();
                                data.ULAIN = clientUlain;
                                data.Description = formValues["DocDescription"];
                                data.DocumentPath = clientUlain + "/" + tstamp + postedFile.FileName;
                                data.CreatedDate = DateTime.Now;
                                data.DateUploaded = DateTime.Now;
                                data.CreatorId = User.GetUbuildClient().CreatorId;
                                data.DocTypeId = Convert.ToInt32(formValues["DocType"]);

                                DbHandler.Instance.SaveClientDoc(data);
                            }
                            catch (Exception e)
                            {
                                Logger.Debug(this, e.Message);
                            }

                        }
                    }

                    var message1 = string.Format("Image Updated Successfully.");
                    dict.Add("success", message1);
                    return Request.CreateResponse(HttpStatusCode.Created, dict);

                }

                var res = string.Format("Please Upload a image.");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }
            catch (Exception ex)
            {
                var res = string.Format("some Message");
                dict.Add("error", res);
                return Request.CreateResponse(HttpStatusCode.NotFound, dict);
            }
        }

        private Dictionary<string, string> GetFormValues(NameValueCollection col)
        {
            var dict = new Dictionary<string, string>();

            foreach (var key in col.Keys)
            {
                dict.Add(key.ToString(), col[key.ToString()].ToString());
            }
            return dict;

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

        [System.Web.Mvc.HttpPost]
        public ServiceResponse ClientConfirmation([FromBody]JObject data)
        {
            var clientAuth = User.GetUbuildClient();
            return LoanApplicationHandler.ApplyForLoan(data, clientAuth);
        }



        
    }
}