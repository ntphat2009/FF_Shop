using Azure;
using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.Service.Repository;
using BackendCore7.ViewModel;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NETCore.MailKit.Core;
using System.ComponentModel;
using System.Drawing;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using User.Management.Service.Model;
using User.Management.Service.Service;
using static System.Net.Mime.MediaTypeNames;

namespace BackendCore7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly MyDbContext _db;
        private readonly IAccountRepository _account;
        private readonly IEmailSender _emailSender;
        private readonly UserManager<ApplicationUser> _userManager;
        public const int Pbkdf2Iterations = 1000;

        public AccountController( IConfiguration configuration, UserManager<ApplicationUser> userManager, MyDbContext dbContext, RoleManager<IdentityRole> roleManager, IAccountRepository account, IEmailSender emailSender)
        {
            this.configuration = configuration;
            _roleManager = roleManager;
            _db = dbContext;
            _account = account;
            _emailSender = emailSender;
            _userManager = userManager;
        }

        [HttpGet]
        //[Authorize(Roles = "User")]
        public IActionResult Get()
        {
            var userlist = _account.GetUsers();
            var json = JsonSerializer.Serialize(userlist);

            return Content(json, "application/json");

        }

        [HttpPost]
        [Route("set-admin")]
        public async Task<IActionResult> SetRoleAdmin(string id)
        {
           
            try
            {
                await _account.SetAdmin(id);
                return Ok("Set role success!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignUpVM signUpVM)
        {

            var result = await _account.SignUpAsync(signUpVM, Url);

            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }
            return BadRequest();
        }
        [HttpPost]
        [Route("SignUp-Admin")]
        public async Task<IActionResult> SignUpAdmin(SignUpVM signUpVM)
        {

            var result = await _account.SignUpAdminAsync(signUpVM, Url);

            if (result.Succeeded)
            {
                return Ok(result.Succeeded);
            }
            return BadRequest();
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            return await _account.ConfirmEmail(token, email);
        }

       
        private async Task<ResetPasswordCode> GenerateCodeAsync(string email)
        {
            Random rnd = new Random();
          
            var code = new ResetPasswordCode
            {
                Code = rnd.Next(1, 99999).ToString("D5"),
                expireCode = DateTime.UtcNow.AddMinutes(5),
                Email =email
            };

            _db.ResetPasswordCodes.Add(code);
            await _db.SaveChangesAsync();

            return code;
        }
        [HttpPost]
        [Route("forgotPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            //var shortenToken = await ShortenResetTokenAsync(_userManager, user);
            //var token = Uri.UnescapeDataString(shortenToken);
            var codeAccess=await GenerateCodeAsync(user.Email);
           
            var forgotPasswordLink = Url.Action(nameof(ResetPassword), "Account", new { token, email = user.Email }, Request.Scheme);
            var message = new Message(new string[] { user.Email }, "Confirmation forgot password link ","Mã xác thực :\t"+ codeAccess.Code +"\nThời gian hiệu lực :5\tPhút");

          
            _emailSender.SendEmail(message);
            return Ok("Code is sending to your mail"); ///tra the token
        }


        [HttpGet("resetPassword")]
        public async Task<IActionResult> ResetPassword(string code, string email)
        {
            var model = new CodeVM { Code = code, Email = email };
            //var htmlContent = "<html> <head><meta charset=\"UTF-8\"> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <title>Xác nhận thay đổi mật khẩu</title> <style>.container p {\r\n    white-space: pre-line;\r\n    word-wrap: break-word;\r\n text-align: center;} .container p strong {\r\n    margin-left: 20px;\r\n} body { white-space: pre-line;font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; } .container { background-color: #fff;max-width: 100%;\r\nmargin: 0 auto; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); } h1 { text-align: center; margin-bottom: 20px; } </style> </head> <body> <div class=\"container\"> <h1>Mã xác nhận thay đổi mật khẩu</h1> <p>Xử dụng mã này trong phần thay đổi mật khẩu: <strong> " + model.Token + " </strong></p> </div> </body> </html>";

            return Ok(model);//Content(htmlContent, "text/html");
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("confirm-code")]
        public async Task<IActionResult> ConfirmCodeAccess (CodeVM codeVM)
        {
            var user = _userManager.FindByEmailAsync(codeVM.Email);
            if (user == null)
            {
                return NotFound("Userid not fount");
            }
            else
            {
                var code = _db.ResetPasswordCodes.FirstOrDefault(p => p.Code == codeVM.Code && p.Email == user.Result.Email);
                if (code == null)
                {
                    return NotFound("Code not fount");
                }
                return Ok("success to confirm code");
            }
           
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("resetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
        {
            if (resetPassword.Password != resetPassword.ConfirmPassword)
            {
                return BadRequest("Mật khẩu và xác nhận mật khẩu không khớp.");
            }
            var user = await _userManager.FindByEmailAsync(resetPassword.Email);
            //var codeasync = _db.resetPasswordCodes.Where(p=>p.UserId==user.Id && p.Code== resetPasswordCode);
            //if (code==null )
            //{
            //    return BadRequest("Code not found");
            //}
            user.PasswordHash = HashPasswordV3(resetPassword.Password);

            if (user != null)
            {
                var resetPassResult = await _userManager.UpdateAsync(user); //_userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
                if (!resetPassResult.Succeeded)
                {
                    foreach (var error in resetPassResult.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }
                    return Ok(ModelState);

                }
                return StatusCode(StatusCodes.Status200OK);
            }
            return StatusCode(StatusCodes.Status404NotFound);

        }
        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInVM signInVM)
        {
            var result = await _account.SignInAsync(signInVM);
            if (string.IsNullOrEmpty(result))
            {
                return Unauthorized();
            }
            return Ok(result);
        }
        [HttpGet("{userName}")]
        public async Task<IActionResult> GetUserByUserName(string userName)
        {
            try
            {
                var user = await _account.GetUserByUserName(userName);
                if (user == null)
                {
                    return NotFound(); // Trả về 404 Not Found nếu không tìm thấy người dùng
                }

                return Ok(user); // Trả về thông tin người dùng nếu tìm thấy
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Trả về lỗi 500 nếu có lỗi xảy ra
            }
        }
        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                var user = await _account.GetUserById(id);
                if (user == null)
                {
                    return NotFound(); // Trả về 404 Not Found nếu không tìm thấy người dùng
                }

                return Ok(user); // Trả về thông tin người dùng nếu tìm thấy
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Trả về lỗi 500 nếu có lỗi xảy ra
            }
        }
        [HttpPut("{id}")]
        public IActionResult Update(UserModel user, string id)
        {
            try
            {
                _account.UpdateByUserName(user, id);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                _account.DeleteById(id);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost]
        [Route("google")]
        public async Task<IActionResult> Google([FromBody] GoogleTokenModel tokenModel)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(tokenModel.Token);
                // Xử lý xác thực và tạo JWT token của bạn
                // Ví dụ:
                var jwtToken = GenerateJwtToken(payload);

                return Ok(new { token = jwtToken });
            }
            catch (InvalidJwtException)
            {
                return BadRequest("Invalid token");
            }
        }

        private string GenerateJwtToken(GoogleJsonWebSignature.Payload payload)
        {
            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var token = new JwtSecurityToken
            (

                //claims: authClaims,
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddMinutes(20),
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha256Signature)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);


        }

        public static string HashPasswordV3(string password)
        {
            return Convert.ToBase64String(HashPasswordV3(password, RandomNumberGenerator.Create()
                , prf: KeyDerivationPrf.HMACSHA512, iterCount: Pbkdf2Iterations, saltSize: 128 / 8
                , numBytesRequested: 256 / 8));
        }

        private static byte[] HashPasswordV3(string password, RandomNumberGenerator rng, KeyDerivationPrf prf, int iterCount, int saltSize, int numBytesRequested)
        {
            byte[] salt = new byte[saltSize];
            rng.GetBytes(salt);
            byte[] subkey = KeyDerivation.Pbkdf2(password, salt, prf, iterCount, numBytesRequested);
            var outputBytes = new byte[13 + salt.Length + subkey.Length];
            outputBytes[0] = 0x01; // format marker
            WriteNetworkByteOrder(outputBytes, 1, (uint)prf);
            WriteNetworkByteOrder(outputBytes, 5, (uint)iterCount);
            WriteNetworkByteOrder(outputBytes, 9, (uint)saltSize);
            Buffer.BlockCopy(salt, 0, outputBytes, 13, salt.Length);
            Buffer.BlockCopy(subkey, 0, outputBytes, 13 + saltSize, subkey.Length);
            return outputBytes;
        }

        private static void WriteNetworkByteOrder(byte[] buffer, int offset, uint value)
        {
            buffer[offset + 0] = (byte)(value >> 24);
            buffer[offset + 1] = (byte)(value >> 16);
            buffer[offset + 2] = (byte)(value >> 8);
            buffer[offset + 3] = (byte)(value >> 0);
        }
    }
}
