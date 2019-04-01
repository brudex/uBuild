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
        public List<CustomizableFnFs> GetCustomizableFnFs()
        {
            return DbHandler.Instance.GetList<CustomizableFnFs>();
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
                        IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".jpeg", ".pdf" };
                        var ext = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.'));
                        var extension = ext.ToLower();
                        if (!AllowedFileExtensions.Contains(extension))
                        {
                            var message = string.Format("Please Upload image of type .jpg,.jpeg,pdf");

                            return Request.CreateResponse(HttpStatusCode.OK, new ServiceResponse() { Status = "01", Message = message });
                        }
                        else if (postedFile.ContentLength > MaxContentLength)
                        {
                            return Request.CreateResponse(HttpStatusCode.OK, new ServiceResponse() { Status = "01", Message = "File too large" });
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
                                 //data.Description = formValues["DocDescription"];
                                data.DocumentPath = clientUlain + "/" + tstamp + postedFile.FileName;
                                data.CreatedDate = DateTime.Now;
                                data.DateUploaded = DateTime.Now;
                                data.CreatorId = User.GetUbuildClient().CreatorId;
                                data.DocTypeId = Convert.ToInt32(formValues["DocType"]);

                                DbHandler.Instance.SaveClientDoc(data);

                                return Request.CreateResponse(HttpStatusCode.OK, new ServiceResponse() { Status = "00", Message = "File uploaded successfuly" });
                            }
                            catch (Exception e)
                            {
                                Logger.Error(this, "Error uploading document", e);
                            }

                        }
                    }



                }

                return Request.CreateResponse(HttpStatusCode.OK, new ServiceResponse() { Status = "01", Message = "Please select a file to upload" });
            }
            catch (Exception ex)
            {
                Logger.Error(this, "Error uploading document", ex);
                return Request.CreateResponse(HttpStatusCode.OK, new ServiceResponse() { Status = "01", Message = "File could not be uploaded . please try again. File might be larger than 4MB" });
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
            var ulain = data["ulain"];
            var accepted = data["accepted"].ToBoolean();
            return LoanApplicationHandler.ClientConfirm(ulain.ToString(), accepted);
        }


        //[Authorize]
        //[System.Web.Mvc.HttpPost]
        //public ServiceResponse AcceptRejectLoanTerms([FromBody]JObject data)
        //{
        //    return LoanApplicationHandler.UpdatedUserAcceptedTerms(data);
        //}



    }
}