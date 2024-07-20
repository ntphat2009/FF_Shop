namespace BackendCore7.ViewModel
{
    public class UserModel
    {
        
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string? Address { get; set; }
        public string? Gender { get; set; }
        public string? City { get; set; }
        public string? PhoneNumber { get; set; }
        public bool LockoutEnabled { get; set; }
    }
}
