using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace uBuildCore
{
    /// <summary>
    /// Todo rewrite to clean tokens that have expired
    /// </summary>
    public class SoftTokenService
    {
        internal static List<SoftToken> _tokenRepo = new List<SoftToken>();
        private static Random _randomgen = new Random();
        public static string GenerateSoftToken(string mobile)
        {
            string token = _randomgen.Next(0, 999999).ToString("D6");
            var softToken = new SoftToken() {AcctNumber = mobile,Token = token};
            _tokenRepo.Add(softToken);
            return token;
        }

        public static bool VerifyToken(string token,string acctNo)
        {
            var softToken = _tokenRepo.FirstOrDefault(x => x.AcctNumber == acctNo);
            if (softToken != null)
            {
                if (token == softToken.Token)
                {
                    return true;
                }
                return false;
            }            
            return false;
        }
    }

    public class SoftToken
    {
        public string AcctNumber { get; set; }
        public string Token { get; set; }
    }
}
