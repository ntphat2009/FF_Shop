using BackendCore7.Models;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface IAccountRepository
    {
        public Task<IdentityResult> SignUpAsync(SignUpVM signUp, IUrlHelper urlHelper);
        public Task<IdentityResult> SignUpAdminAsync(SignUpVM signUp, IUrlHelper urlHelper);

        //public Task<IdentityResult> ResetPassword(string userName, ForgotPasswordMD forgot);
        Task<IActionResult> ConfirmEmail(string token, string email);
        public Task<string> SignInAsync(SignInVM signIn);

        List<ApplicationUser> GetUsers();
        Task<ApplicationUser> GetUserByUserName(string username);
        Task<ApplicationUser> GetUserById(string id);
        Task TestSendMail();

        void UpdateByUserName(UserModel user, string Id);
        void DeleteById(string id);
        public Task<IdentityResult> SetAdmin(string id);


    }
}
