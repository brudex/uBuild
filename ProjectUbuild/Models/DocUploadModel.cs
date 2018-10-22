using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectUbuild.Models
{
    public class DocUploadModel
    {
        public string DocDescription { get; internal set; }
        public int DocTypeId { get; internal set; }
        public string DocName { get; internal set; }
    }
}