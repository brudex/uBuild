using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
    public class GhlClientProfile
    {
       public GhlClientProfile()
        {
        }
        public int Id { get; set; }
        public string ApplicationId { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Othernames { get; set; }
        public string Phonenumber { get; set; }
    }
}
