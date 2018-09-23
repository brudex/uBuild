using System.Collections.Generic;
using System.Web.Http;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Controllers.Api
{
    public class LoanApiController : ApiController
    {
        [System.Web.Mvc.HttpGet]
        public List<HouseImage> GetHouseImages()
        {
           return DbHandler.Instance.GetHouseImages();
        }
        
        [System.Web.Mvc.HttpGet]
        public List<FittingsFixtures> GetFittingsFixtures()
        {
            return DbHandler.Instance.GetFittingsFixtures();
        }
    }
}