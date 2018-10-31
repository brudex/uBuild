using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using ProjectUbuild.Models;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult MyApplications()
        {
            var clientAuth = User.GetUbuildClient();
            var vm = new MyApplicationsViewModel(clientAuth.RecordId);
            return View(vm);
        }

        public ActionResult Guidelines()
        {
            
            return View();
        }

        public ActionResult About()
        {

            return View();
        }
        public ActionResult FaQs()
        {

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}