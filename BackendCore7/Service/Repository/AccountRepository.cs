using Azure;
using Azure.Core;
using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.ResponseMessenge;

using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PayPalCheckoutSdk.Orders;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using User.Management.Service.Model;
using User.Management.Service.Service;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BackendCore7.Service.Repository
{

    public class AccountRepository : IAccountRepository

    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IEmailSender _emailService;
        private readonly IUrlHelper _urlHelper;
        private readonly MyDbContext _db;

        public AccountRepository(IUrlHelper urlHelper, IEmailSender emailService, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, MyDbContext dbContext)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.roleManager = roleManager;
            _emailService = emailService;
            _urlHelper = urlHelper;
            _db = dbContext;
        }

        public async Task<IdentityResult> ConfirmEmailAsync(string email, string token)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    return result;
                }
            }
            return IdentityResult.Failed();
        }

        public void DeleteById(string id)
        {
            var account = _db.Users.FirstOrDefault(x => x.Id == id);
            if (account != null)
            {
                _db.Users.Remove(account);
                _db.SaveChanges();
            }
        }

        public async Task<ApplicationUser> GetUserById(string id)
        {
            var _user = await _db.Users.FirstOrDefaultAsync(x => x.Id == id);
            return _user;
        }

        public async Task<ApplicationUser> GetUserByUserName(string username)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == username);
            return user;
        }

        public List<ApplicationUser> GetUsers()
        {
            return _db.Users.ToList();
        }
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user != null)
            {
                var result = await userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    return new OkObjectResult(
                        new BackendCore7.ResponseMessenge.Response { Status = "Success", ErrorMessage = "Email Verified Successfully" });
                }
            }
            return new ObjectResult(
                     new BackendCore7.ResponseMessenge.Response { Status = "Error", ErrorMessage = "This User Does Not Exist!" })
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };
        }

        public async Task<string> SignInAsync(SignInVM signIn)
        {
            var user = await userManager.FindByEmailAsync(signIn.Email);
            var result = await signInManager.PasswordSignInAsync(signIn.Email, signIn.Password, false, false);
            if (!result.Succeeded)
            {
                return string.Empty;
            }
            var authClaims = new List<Claim>
            {


                new Claim ("email",signIn.Email),

                new Claim (ClaimTypes.Email,signIn.Email),
                new Claim (JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };
            var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }
            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
            var token = new JwtSecurityToken
            (

                claims: authClaims,
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.UtcNow.AddHours(5),
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha256Signature)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //SIGN UP FOR ADMIN
        public async Task<IdentityResult> SignUpAdminAsync(SignUpVM signUp, IUrlHelper urlHelper)
        {
            var user = new ApplicationUser
            {
                FirstName = signUp.FirstName,
                LastName = signUp.LastName,
                Email = signUp.Email,
                UserName = signUp.Email,
                Gender = signUp.Gender,
                Address = signUp.Address,
                City = signUp.City,
                PhoneNumber = signUp.PhoneNumber,

            };
            bool isDuplicate = await _db.Users.AnyAsync(p => p.Email == signUp.Email);
            if (isDuplicate)
            {
                var error = new IdentityError { Description = "Tên sản phẩm đã tồn tại." };
                return IdentityResult.Failed(error);
            }

            var role = "Admin";

            if (await roleManager.RoleExistsAsync(role))
            {
                await userManager.AddToRoleAsync(user, role);

                var result = await userManager.CreateAsync(user, signUp.Password);
                var token = await userManager.GenerateEmailConfirmationTokenAsync(user);

                // Create confirmation link
                var confirmationLink = _urlHelper.Action(nameof(ConfirmEmail), "Account", new { token, email = user.Email }, "https");

                // Send email with confirmation link
                var message = new Message(new string[] { user.Email }, "Confirmation email link", confirmationLink);
                _emailService.SendEmail(message);
                return result;
            }

            return await userManager.CreateAsync(user, signUp.Password);
        }
        //SIGN UP FOR USER
        public async Task<IdentityResult> SignUpAsync(SignUpVM signUp, IUrlHelper urlHelper)
        {
            var user = new ApplicationUser
            {
                FirstName = signUp.FirstName,
                LastName = signUp.LastName,
                Email = signUp.Email,
                UserName = signUp.Email,
                Gender = signUp.Gender,
                Address = signUp.Address,
                City = signUp.City,
                PhoneNumber = signUp.PhoneNumber,

            };
            bool isDuplicate = await _db.Users.AnyAsync(p => p.Email == signUp.Email);
            if (isDuplicate)
            {
                var error = new IdentityError { Description = "Tên sản phẩm đã tồn tại." };
                return IdentityResult.Failed(error);
            }

            var role = "User";

            if (await roleManager.RoleExistsAsync(role))
            {
                await userManager.AddToRoleAsync(user, role);

                var result = await userManager.CreateAsync(user, signUp.Password);
                var token = await userManager.GenerateEmailConfirmationTokenAsync(user);

                // Create confirmation link
                var confirmationLink = _urlHelper.Action(nameof(ConfirmEmail), "Account", new { token, email = user.Email }, "https");

                // Send email with confirmation link
                var message = new Message(new string[] { user.Email }, "Confirmation email link", confirmationLink);
                _emailService.SendEmail(message);
                return result;
            }

            return await userManager.CreateAsync(user, signUp.Password);
        }

        public async Task TestSendMail()
        {
            var messenge = new Message(new string[] { "thuanphatnguyen2003@gmail.com" }, "Test", "Test sendemail success");
            _emailService.SendEmail(messenge);
        }

        public void UpdateByUserName(UserModel user, string id)
        {
            var account = _db.Users.FirstOrDefault(p => p.Id == id);
            if (account != null)
            {
                //account.UserName= user.Email;

                account.FirstName = user.FirstName;
                account.LastName = user.LastName;
                account.PhoneNumber = user.PhoneNumber;
                account.Gender = user.Gender;
                account.Address = user.Address;
                account.City = user.City;
                account.LockoutEnabled = user.LockoutEnabled;
                _db.SaveChanges();
            }
        }
        public async Task<IdentityResult> SetAdmin(string id)
        {
            var account = _db.Users.FirstOrDefault(p => p.Id == id);
            if (account != null)
            {
                var role = "Admin";


                if (await roleManager.RoleExistsAsync(role))
                {
                    return await userManager.AddToRoleAsync(account, role);
                }

            }
            return null;
        }
    }
}
