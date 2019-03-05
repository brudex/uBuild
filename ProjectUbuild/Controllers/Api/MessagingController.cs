using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using ProjectUbuild.Models;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Controllers.Api
{
    public class MessagingController : ApiController
    {
        [System.Web.Mvc.HttpPost]
        public ServiceResponse SaveMessage([FromBody] JObject value)
        {

            var email = User.Identity.GetEmailAdress();
            var message = new Messages();
            message.Sender = email;
           // message.CreatedAt = DateTime.Now;
            message.Receipient = "Bank";
            message.IsRead = false;
            message.Message = value["message"].ToString();
            DbHandler.Instance.SaveMessage(message);
            var response = new ServiceResponse();
            response.Status = "00";
            response.Message = "Message saved successfully";
            return response;

        }

        [System.Web.Mvc.HttpGet]
        public ServiceResponse GetUnreadMessagesCount()
        {
            var email = User.Identity.GetEmailAdress();
            int count =DbHandler.Instance.CountUnreadMessages(email);
            var response=new ServiceResponse();
            response.Status = "00";
            response.Message = "Message saved successfully";
            response.data = count;
            return response; 
        }

        [System.Web.Mvc.HttpGet]
        public ServiceResponse MarkMessagesAsRead()
        {
            var email = User.Identity.GetEmailAdress();
             DbHandler.Instance.MarkMessagesAsRead(email);
            var response = new ServiceResponse();
            response.Status = "00";
            response.Message = "Messages updated successfully";
            return response;
        }


        [System.Web.Mvc.HttpGet]
        public ServiceResponse GetMessageList()
        {
            var email = User.Identity.GetEmailAdress();
             DbHandler.Instance.MarkMessagesAsRead(email);
            var messages = DbHandler.Instance.GetMessageList(email);
            var response = new ServiceResponse();
            response.Status = "00";
            response.Message = "Messages updated successfully";
            response.data = messages;
            return response;
        }
    }
}
