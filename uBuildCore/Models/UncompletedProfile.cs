using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace uBuildCore.Models
{
    public class UncompletedProfile
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public string Data { get; set; }
    }
}