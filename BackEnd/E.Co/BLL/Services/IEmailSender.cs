using DataAccess.ViewModels;
using System.Collections.Generic;
using System.Net.Mail;
using System.Threading.Tasks;


namespace BLL.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync( MailRequest mailRequest);

    }
}
