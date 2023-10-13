using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.ViewModels
{
    public  class LoginModel
    {
        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "This isn't an email address.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password address is required.")]
        public string Password { get; set; }
        public bool RememberMe { get; set; } = false;
    }
}
