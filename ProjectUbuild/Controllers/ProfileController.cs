using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProjectUbuild.Models;

namespace ProjectUbuild.Controllers
{
    public class ProfileController : Controller
    {
        // GET: Profile
        [Authorize]
        public ActionResult Index()
        {
            var clientInfo = User.GetUbuildClient().GetClientInfo();
            var vm = new ProfileViewModel();
            vm.ProfileSubmitted = false;
            if (clientInfo != null)
            {
                vm.ProfileSubmitted = true;
                vm.AccountVerified = clientInfo.AccountVerified;
            }
            return View(vm);
        }

        [Authorize]
        public ActionResult Messages()
        {
            return View();
        }

        
    }
}
