using System.ComponentModel.DataAnnotations;

namespace BackendCore7.ViewModel
{
    public class SignUpVM
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        //public string ConfirmPassWord { get; set; } = null!;
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? PhoneNumber { get; set; }
   
    }
}
