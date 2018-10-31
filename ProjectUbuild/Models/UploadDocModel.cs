using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectUbuild.Models
{
    public class UploadDocModel
    {
        public string ULAIN { get; set; }
        public int DocTypeId { get; set; }
        public string Description { get; set; }
        public string DocumentPath { get; set; }
        public DateTime DateUploaded { get; set; }
        public string CreatorId { get; set; }
        public string CreatorName { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}