﻿using System;
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

        public ActionResult LoanDocs()
        {
            var DocTypesList = DbHandler.Instance.GetDocTypes();
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



    }
}
