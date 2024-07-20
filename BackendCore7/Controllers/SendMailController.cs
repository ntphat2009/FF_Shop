using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using User.Management.Service.Model;
using User.Management.Service.Service;

namespace BackendCore7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendMailController : ControllerBase
    {
        private readonly IEmailSender _emailService;

        public SendMailController(IEmailSender emailService)
        {
            _emailService=emailService;
        }
        [HttpGet]
        public IActionResult TestSendEmailllll()
        {
            var messenge = new Message(new string[] { "thuanphatnguyen2003@gmail.com" }, "AAAAAA", "Test sendemail success");
            _emailService.SendEmail(messenge);
            return StatusCode(StatusCodes.Status200OK);
        }
    }
}
