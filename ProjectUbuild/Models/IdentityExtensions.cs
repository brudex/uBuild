using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Principal;
using System.Web;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Models
{
    public static  class IdentityExtensions
    {
        public static ClientAuths GetUbuildClient(this IPrincipal user)
        {
            var email = user.Identity.GetEmailAdress();
            var clientAuth = DbHandler.Instance.GetClientAuthByEmail(email);
            return clientAuth;
        }

        public static ClientInfos GetClientInfos(this ClientAuths user)
        {
            var clientAuth = DbHandler.Instance.GetClientInfoByEmail(user.RecordId);
            return clientAuth;
        }
        public static string GetEmailAdress(this IIdentity identity)
        {
            var userId = identity.GetUserId();
            if (!string.IsNullOrEmpty(userId))
            {
                using (var context = new ApplicationDbContext())
                {

                    var user = context.Users.FirstOrDefault(u => u.Id == userId);
                    return user.Email;
                }
            }
            return string.Empty;

        }


    }
}