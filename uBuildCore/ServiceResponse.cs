using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uBuildCore
{
    public class ServiceResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }
        public object data { get; set; }
    }
}