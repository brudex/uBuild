using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
   public class LoanDocuments
    {

      public int RecordId{get;set;}
      public string ULAIN{get;set;}
      public int DocTypeId{get;set;}
      public string Description{get;set;}
      public string DocumentPath{get;set;}
      public string DateUploaded{get;set;}
      public int CreatorId{get;set;}
      public string CreatorName{get;set;}
      public DateTime CreatedDate{get;set;}
    }
}
