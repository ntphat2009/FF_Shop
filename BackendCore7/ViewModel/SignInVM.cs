using System.ComponentModel.DataAnnotations;

namespace BackendCore7.ViewModel
{
    public class SignInVM
    {
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
}
