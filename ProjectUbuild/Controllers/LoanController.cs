using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using ProjectUbuild.Models;
using ProjectUbuild.Properties;
using uBuildCore;

namespace ProjectUbuild.Controllers
{
    public class LoanController : Controller
    {
        // GET: Loan
        public ActionResult Eligibility()
        {
            return View();
        }
        [Authorize]
        public ActionResult LoanDocs(string clientUlain)
        {
            if (string.IsNullOrEmpty(clientUlain))
                return Redirect("/Home/MyApplications");

            var vm = new LoadDocsViewModel(clientUlain);

            return View(vm);
        }

        // GET: Loan

        [Authorize]
        public ActionResult Apply(string loanamount)
        {
            var viewModel = new ApplyLoanViewModel();
            NameValueCollection n = Request.QueryString;
            var clientAuth = User.GetUbuildClient();
            var ulains = DbHandler.Instance.GetClientLoanProcStages(clientAuth.RecordId, "U");
            IDictionary<string,string> dict = new Dictionary<string, string>();
            if (ulains.Count == 0)
            {

                viewModel.hasApplied = false;
                if (n.Count > 1)
                {

                      dict = n.ToDictionary();
                    if (dict.ContainsKey("currency"))
                    {
                        dict["currencyId"] = "" + DbHandler.Instance.GetCurrencyId(dict["currency"].ToString());
                    }
                    var clientInfo = clientAuth.GetClientInfo();
                    if (clientInfo != null)
                    {
                        dict["fullName"] = clientInfo.FirstName + " " + clientInfo.LastName;
                        dict["accountNumber"] = clientInfo.CustomerNo; //todo get acct number
                        dict["customerNo"] = clientInfo.CustomerNo;
                    }
                    var json = new JavaScriptSerializer().Serialize(dict);

                    viewModel.json = json;
                }
            }
            else
            {
                viewModel.hasApplied = true;
            }
            return View(viewModel);
        }



        [Authorize]
        public ActionResult RemoveLoanDoc(string uLain, int Id)
        {
            try
            {
                var docInstance = new LoadDocsViewModel(uLain).loanDocuments.FirstOrDefault(f => f.RecordId == Id);
                if (docInstance != null)
                {
                    var FilePath = Server.MapPath(Settings.Default.DocUploadUrl + "/" + docInstance.DocumentPath);
                    System.IO.File.Delete(@FilePath);
                    DbHandler.Instance.RemoveClientDocs(uLain, Id);
                }
            }
            catch (Exception e)
            {
                Logger.Error(this, e.Message);
            }

            // redirect back to the index action to show the form once again
            return RedirectToAction("LoanDocs", new { clientUlain = uLain });
        }



    }
}
