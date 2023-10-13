using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ViewModels
{
    public class UserModel
    {
        public string LoginId { get; set; }
        public string Password { get; set; }
        public string UserMessage { get; set; }
        public string UserToken { get; set; }
    } 
}
