using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BackendCore7.Models;
using BackendCore7.ViewModel;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;

namespace BackendCore7.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthController(IConfiguration configuration,UserManager<ApplicationUser> userManager) 
        {
            _configuration = configuration; 
            _userManager= userManager;
        }
        [HttpPost("google")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleTokenModel model)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(model.Token);
            var user = await _userManager.FindByEmailAsync(payload.Email);

            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = payload.Email,
                    Email = payload.Email,
                    GoogleId = payload.Subject,
                    ImageUrl = payload.Picture,
                    FirstName = payload.GivenName,
                    LastName = payload.FamilyName,
                    
                    // Các thuộc tính khác
                };
                var result = await _userManager.CreateAsync(user);

                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Failed to create user.");
                }
            }
            else
            {
               
                    user.GoogleId = payload.Subject;
                    await _userManager.UpdateAsync(user);
               
            }

            // Trả về token Google hoặc tạo JWT nếu cần thiết
            return Ok(new {  model.Token });
        }

        //[HttpGet("signin-google")]
        //public IActionResult SignInWithGoogle()
        //{
        //    var properties = new AuthenticationProperties { RedirectUri = Url.Action("GoogleCallback") };
        //    return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        //}
        //[HttpGet("google-callback")]
        //public async Task<IActionResult> GoogleCallback()
        //{
        //    try
        //    {
        //        var result = await HttpContext.AuthenticateAsync();
        //        if (!result.Succeeded)
        //            return BadRequest("Google authentication failed");

        //        // Generate JWT token
        //        var token = GenerateJwtToken(result.Principal);
        //        return Redirect($"http://localhost:3000/callback?token={token}");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, $"Internal Server Error: {ex.Message}");
        //    }
        //}

        //private string GenerateJwtToken(ClaimsPrincipal principal)
        //{
        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //    var token = new JwtSecurityToken(
        //        issuer: _configuration["JWT:ValidIssuer"],
        //        audience: _configuration["JWT:ValidAudience"],
        //        claims: principal.Claims,
        //        expires: DateTime.Now.AddMinutes(30),
        //        signingCredentials: creds);

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}
    }

}
