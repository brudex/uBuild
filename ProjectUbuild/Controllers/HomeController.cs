﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
            return View();
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