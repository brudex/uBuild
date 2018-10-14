using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Newtonsoft.Json;
using ProjectUbuild.Models;
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

        // GET: Loan

        [Authorize]
        public ActionResult Apply(string loanamount)
        {
            var info = User.GetUbuildClient();
            NameValueCollection n = Request.QueryString;
            var dict = n.ToDictionary();
            var json = new JavaScriptSerializer().Serialize(dict);
            var viewModel = JsonConvert.DeserializeObject<ApplyLoanViewModel>(json);
            viewModel.json = json;
            return View(viewModel);
        }

        
        
    }
}
