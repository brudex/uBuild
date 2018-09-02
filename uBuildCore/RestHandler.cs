using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using RestSharp.Authenticators;

namespace uBuildCore
{
    public class RestHandler
    {
        static RestHandler instance = null;
        static readonly object padlock = new object();


        RestHandler()
        {
        }

        public static RestHandler Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new RestHandler();
                        }
                    }
                }
                return instance;
            }
        }



        public RestPostResponse DoGetString(string url, string accessToken, string endpoint)
        {
            var client = new RestClient(url);
            var request = new RestRequest(endpoint, Method.GET);
            ServicePointManager.ServerCertificateValidationCallback +=
            (sender, certificate, chain, sslPolicyErrors) => true;
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", "Bearer " + accessToken);
            var resp = new RestPostResponse();
            try
            {
                var response1 = client.Execute(request);
                Logger.Info(this, endpoint + response1.Content);
                resp.content = response1.Content;
                resp.Status = response1.StatusCode;
                return resp;
            }
            catch (Exception ex)
            {
                resp.Status = HttpStatusCode.InternalServerError;
                Logger.Error(this, "RestHandler - DoPost", ex);
                return null;
            }
        }

        public RestPostResponse DoPostGetString(string url, string authorization, string content, string endpoint)
        {
            var client = new RestClient(url);
            var request = new RestRequest(endpoint, Method.POST);
            ServicePointManager.ServerCertificateValidationCallback +=
            (sender, certificate, chain, sslPolicyErrors) => true;
            request.AddHeader("Content-Type", "application/json");
            byte[] bytes = Encoding.UTF8.GetBytes("itransfergipuser:itransfergipuser");
            string base64 = Convert.ToBase64String(bytes);
            request.AddHeader("Authorization", "Basic " + base64);
            request.AddParameter("application/json", content, ParameterType.RequestBody);
            try
            {
                var response1 = client.Execute(request);
                Logger.Info(this, endpoint + response1.Content);
                var resp = new RestPostResponse();
                resp.content = response1.Content;
                resp.Status = response1.StatusCode;
                return resp;
            }
            catch (Exception ex)
            {
                Logger.Error(this, "RestHandler - DoPost", ex);
                return null;
            }
        }

    }

    public class RestPostResponse
    {
        public string content { get; set; }
        public HttpStatusCode Status { get; set; }
    }
}
