using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using User.Management.Service.Model;

namespace User.Management.Service.Service
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
