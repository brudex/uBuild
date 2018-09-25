using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
    public class ClientAuths
    {
       public ClientAuths()
        {
        }
      
        
        public Int32 RecordId { get; set; }

        
        public String FirstName { get; set; }

        
        public String LastName { get; set; }

        
        public String OtherNames { get; set; }

        
        public String EmailAddress { get; set; }

        
        public String MobileNumber { get; set; }

         
        public String EncPassword { get; set; }

         
        public Boolean IsActivated { get; set; }

        public DateTime LastLoginAt { get; set; }

        public Int32 CreatorId { get; set; }

         
        public String CreatorName { get; set; }

        public DateTime CreatedDate { get; set; }

        public Int32 AuthorizerId { get; set; }

         
        public String AuthorizerName { get; set; }

        public DateTime? AuthorizedDate { get; set; }

        public string FullName => FirstName + " " + LastName;
    }
 

}
