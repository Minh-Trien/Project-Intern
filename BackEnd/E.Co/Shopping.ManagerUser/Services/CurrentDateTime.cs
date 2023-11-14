using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shopping.ManagerUser.Services
{
    public class CurrentDateTime
    {
        public static DateTime GetcurrentDateTime
        {
            get
            {
                DateTime nowUtc = DateTime.UtcNow;
                TimeZoneInfo vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time"); // Múi giờ của Việt Nam
                DateTime vietnamTime = TimeZoneInfo.ConvertTimeFromUtc(nowUtc, vietnamTimeZone);
                return vietnamTime;
            }
        }
    }
}
