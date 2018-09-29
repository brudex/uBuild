using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace uBuildCore
{
    public static class ExtensionMethods
    {
        internal static bool EqualsInteger(this string str, int value)
        {
            int v = 0;
            var parsed = int.TryParse(str, out v);
            if (parsed)
            {
                return value == v;
            }
            return false;
        }

        internal static int ToInteger(this JToken jt)
        {
            int v = 00;
            var str = jt.ToString();
            int.TryParse(str, out v);
            return v;
        }

        internal static int ToInteger(this object jt)
        {
            int v = 00;
            var str = jt.ToString();
            int.TryParse(str, out v);
            return v;
        }
        internal static string ToStringOrEmpty(this JToken jt)
        {
            try
            {
                var str = jt.ToString();
                return str;
            }
            catch (Exception)
            {

                return "";
            }

        }
        internal static string ToStringOrEmpty(this JObject jt)
        {
            try
            {
                var str = jt.ToString();
                return str;
            }
            catch (Exception)
            {

                return "";
            }

        }

        internal static string ToJsonString(this object jt)
        {
            try
            {
                var str = JsonConvert.SerializeObject(jt);
                return str;
            }
            catch (Exception)
            {

                return "";
            }

        }


        internal static decimal ToDecimal(this JToken jt)
        {
            decimal v = 0;
            var str = jt.ToString();
            decimal.TryParse(str, out v);
            return v;
        }

        internal static DateTime ToDateTime(this JToken jt)
        {
            DateTime dt = new DateTime();
            var str = jt.ToString();
            DateTime.TryParse(str, out dt);
            return dt;
        }

        internal static bool ToBoolean(this JToken jt)
        {
            var str = jt.ToString();
            return str.Equals("true");
        }

        public static long GenerateRandomNumber(int size)
        {
            Random random = new Random((int)DateTime.Now.Ticks);
            StringBuilder builder = new StringBuilder();
            string s;
            for (int i = 0; i < size; i++)
            {
                s = Convert.ToString(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(s);
            }

            return Convert.ToInt64((builder.ToString()));
        }

        public static string FormatMobile(this string mobile)
        {
            if (string.IsNullOrEmpty(mobile))
            {
                mobile = string.Empty;
                return mobile;
            }
            if (mobile.IndexOf("233", StringComparison.Ordinal) == 0)
            {
                return mobile;
            }
            if (mobile[0] == '+')
            {
                return mobile.Substring(1);
            }
            if (mobile.IndexOf("00", StringComparison.Ordinal) == 0)
            {
                return  mobile.Substring(2);
            }
            if (mobile[0] == '0')
            {
                return "233" + mobile.Substring(1);
            }
            return mobile;
        }

        public static bool IsDigits(this string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return false;
            }
            int n;
            return int.TryParse(text, out n);
        }

        public static bool StatusIsSuccess(this JObject jobj)
        {
            if (jobj["status"].ToStringOrEmpty() == "00" || jobj["status"].ToStringOrEmpty().ToLower() == "true" || jobj["status"].ToStringOrEmpty().ToLower() == "0")
            {
                return true;
            }
            return false;
        }
    }
}
