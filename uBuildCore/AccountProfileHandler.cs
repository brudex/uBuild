﻿using System;
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
         public static ServiceResponse GetAccountProfile(ClientAuths client,bool fullData= false)
         {
             T24Customer tclient = null;
            var dataResult = new JObject();
            try
             {
                
                 tclient = T24Customer.GetCustomerBYNumber(client.MobileNumber.FormatMobile());
                 if(fullData)
                 {
                     string tjson = JsonConvert.SerializeObject(tclient);
                     dataResult = JObject.Parse(tjson);
                    dataResult.Remove("CreatorId");
                    dataResult.Remove("CreatorName");
                    dataResult.Remove("CreatedDate");
                    dataResult.Remove("AuthorizerId");
                    dataResult.Remove("AuthorizerName");
                    dataResult.Remove("AuthorizedDate");
                    dataResult.Remove("ResponseString"); 
                }
                if (tclient != null)
                {
                    dataResult["customerNo"] = tclient.CustomerNo;
                    dataResult["accountNumber"] = tclient.CustomerNo;
                }                
             }
             catch (Exception ex)
             {
                 Logger.Error(typeof(AccountProfileHandler), "Errror in T24Customer.GetCustomerBYNumber ",ex);
             }        
           
            dataResult["fullName"] = client.FullName();           
            var response = new ServiceResponse();
            response.Status = "00";
            response.data = dataResult;
            return response;
        }


        public static ServiceResponse SendOtp(JObject data, ClientAuths client)
        {
//            return new ServiceResponse() {Status = "00",Message = "Token sent"};
//            //todo remove above
            T24Customer tclient = null;
            GHLService.Notification notificaiton = new Notification();
            var response = new ServiceResponse();
            string acctNo = data["acctNo"].ToStringOrEmpty();
            try
            {

                tclient = T24Customer.GetCustomerBYAccount(acctNo);
                if (tclient != null)
                {
                    string mobile = tclient.MobilePhone.FormatMobile();
                    var otp = SoftTokenService.GenerateSoftToken(acctNo);
                    string message = "Verification code : " + otp;
                    GHLService.Notification.SendSMS(mobile, message);
                    response.Status = "00";
                    response.Message = "Please enter verification code sent to your phone";
                }
                else
                {
                    response.Status = "01";
                    response.Message = "Account could not be verified. Please check and try again";
                }
            }
            catch (Exception ex)
            {
                response.Status = "05";
                response.Message = ex.Message;
                Logger.Error(typeof(AccountProfileHandler), "Errror in T24Customer.GetCustomerBYNumber ", ex);
            }

            return response;

        }

         public static ServiceResponse ValidateOtp(JObject data, ClientAuths clientAuth)
         { 
             var response = new ServiceResponse();
             string acctNo = data["acctNo"].ToStringOrEmpty();
             string token = data["token"].ToStringOrEmpty();
             var validated = SoftTokenService.VerifyToken(token, acctNo);
             if (validated)
             {
                 response.Status = "00";
                 response.Message = "Token successfully validated";
                return response;
                 
             }
             response.Status = "03";
             response.Message = "Invalid verification token";
             return response;
         }
    }
}