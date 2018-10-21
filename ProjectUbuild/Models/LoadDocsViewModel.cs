using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using uBuildCore;
using uBuildCore.Models;

namespace ProjectUbuild.Models
{
    public class LoadDocsViewModel    
    {
        public LoadDocsViewModel()
        {
            loanDocs = DbHandler.Instance.GetList<DocTypes>();
        }
        public List<DocTypes> loanDocs { get; set; } 

    }
}