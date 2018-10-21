using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;using ProjectUbuild.Models;
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
            var viewModel = new ApplyLoanViewModel();
            NameValueCollection n = Request.QueryString;
            if (n.Count > 1)
            {
                var dict = n.ToDictionary();

                if (dict.ContainsKey("currency"))
                    dict["currencyId"] = "" + DbHandler.Instance.GetCurrencyId(dict["currency"].ToString());
                var json = new JavaScriptSerializer().Serialize(dict);
                viewModel.json = json;
            }
            return View(viewModel);
        }



        [Authorize]
        public ActionResult PostLoanDoc(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                // extract only the filename
                var fileName = Path.GetFileName(file.FileName);
                // store the file inside ~/App_Data/uploads folder
                var path = Path.Combine(Server.MapPath("~/App_Data/uploads"), fileName);
                file.SaveAs(path);
            }
            // redirect back to the index action to show the form once again
            return RedirectToAction("Index");
         } 

    }
}
