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
        private static bool _jobStarted = false;

        static SoftTokenService ()
        {
            if (!_jobStarted)
            {
                 SetInterval(() => ClearOldTokens(), TimeSpan.FromMinutes(5));
                _jobStarted = true;
            }
        }
        public static string GenerateSoftToken(string mobile)
        {
            string token = _randomgen.Next(0, 999999).ToString("D6");
            var softToken = new SoftToken() {AcctNumber = mobile,Token = token,CreatedAt = DateTime.Now};
            _tokenRepo.Add(softToken);
            return token;
        }

        private static void ClearOldTokens()
        {
            var fourMinutesAgo = DateTime.Now.AddMinutes(-4);
            fourMinutesAgo = fourMinutesAgo.AddSeconds(-45);
            for (int i = 0; i < _tokenRepo.Count; i++)
            {
                if (_tokenRepo[i].CreatedAt < fourMinutesAgo)
                {
                    _tokenRepo.Remove(_tokenRepo[i]);
                }
            }
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

        public static async Task SetInterval(Action action, TimeSpan timeout)
        {
            await Task.Delay(timeout).ConfigureAwait(false);

            action();

            SetInterval(action, timeout);
        }
    }

    public class SoftToken
    {
        public string AcctNumber { get; set; }
        public string Token { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
