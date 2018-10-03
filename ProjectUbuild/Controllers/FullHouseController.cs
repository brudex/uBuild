using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using ProjectUbuild.Models;
using uBuildCore;

namespace ProjectUbuild.Controllers
{
    public class FullHouseController : Controller
    {
        public ActionResult Index()
        {
            var model = new HouseDesignsModel();
            model.GetData();
            return View(model);
        }

        public ActionResult HouseDesign(int id)
        {
            var model = DbHandler.Instance.GetHouseDesignById(id);
            if (model == null)
            {
                throw new HttpException(404, "Not found");
            }
            return View(model);
        }
    }
}