using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
            NameValueCollection n = Request.QueryString;
            return View();
        }

        
        
    }
}
