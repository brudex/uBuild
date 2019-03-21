using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore.Models
{
    public class Messages
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Receipient { get; set; }
        public string Message { get; set; }
        public DateTime  CreateDate { get; set; }
        public bool IsRead { get; set; }
    }
}
