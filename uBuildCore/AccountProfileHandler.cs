using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GHLService;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using uBuildCore.Models;

namespace uBuildCore
{
     public class AccountProfileHandler
    {
         public static ServiceResponse GetAccountProfile(ClientAuths client)
         {
             T24Customer tclient = null;
            try
             {
                
                 tclient = T24Customer.GetCustomerBYNumber(client.MobileNumber.FormatMobile());
             }
             catch (Exception ex)
             {
                 Logger.Error(typeof(AccountProfileHandler), "Errror in T24Customer.GetCustomerBYNumber ",ex);
             }        
            var dataResult = new JObject();
            dataResult["fullName"] = client.FullName();
            if (tclient != null)
            { 
                dataResult["customerNo"] = tclient.CustomerNo;
                dataResult["accountNumber"] = tclient.CustomerNo;
            } 
            var response = new ServiceResponse();
            response.Status = "00";
            response.data = dataResult;
            return response;
        }


    }
}
