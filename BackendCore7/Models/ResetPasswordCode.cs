namespace BackendCore7.Models
{
    public class ResetPasswordCode
    {
        public Guid Id { get; set; }
        public string Code { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime expireCode { get; set; }
    }
}
