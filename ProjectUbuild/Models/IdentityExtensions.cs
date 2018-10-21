using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using Newtonsoft.Json;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Models
{
    public static  class IdentityExtensions
    {
        public static ClientAuths GetUbuildClient(this IPrincipal user)
        {
            var email = user.Identity.Name;
            var clientAuth = DbHandler.Instance.GetClientAuthByEmail(email);
            return clientAuth;
        }

        public static ClientInfos GetClientInfos(this ClientAuths user)
        {
            var clientAuth = DbHandler.Instance.GetClientInfoByEmail(user.RecordId);
            return clientAuth;
        }

        
    }
}