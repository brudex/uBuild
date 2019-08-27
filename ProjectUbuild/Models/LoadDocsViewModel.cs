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
        public LoadDocsViewModel(string ULAIN = "")
        {
            loanDocs = DbHandler.Instance.GetList<DocTypes>();
            loanDocuments = DbHandler.Instance.GetClientDocs(ULAIN);
            loanDocuments = loanDocuments.Select
                (dc => new LoanDocuments()
                {
                    RecordId = dc.RecordId,
                    DateUploaded = dc.DateUploaded,
                    DocumentPath = dc.DocumentPath,
                    ULAIN = dc.ULAIN,
                    Description = loanDocs.FirstOrDefault(dt => dt.RecordId == dc.DocTypeId).DocTypeName
                }).ToList();
        }
        public List<DocTypes> loanDocs { get; set; }

        public List<LoanDocuments> loanDocuments { get; set; }

    }
}