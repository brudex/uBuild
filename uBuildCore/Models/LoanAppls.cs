using System;

namespace uBuildCore.Models
{
    public class LoanAppls {
 
        public int RecordId { get; set;}
 
 
        public int ClientId { get; set;}
 
 
        public string ULAIN { get; set;}
 
 
        public int TenorVal { get; set;}
 
 
        public string TenorUnit { get; set;}
 
 
        public string ApplStatus { get; set;}
 
 
        public string ProcessDate { get; set;}
 
        public int CreatorId { get; set;} 
 
        public string CreatorName { get; set;}
 
        public DateTime CreatedDate { get; set;}
 
        public int AuthorizerId { get; set;}
 
 
        public string AuthorizerName { get; set;}
 
        public DateTime AuthorizedDate { get; set;}
 
    }
}