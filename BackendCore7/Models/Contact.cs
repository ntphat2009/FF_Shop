using System.ComponentModel.DataAnnotations;

namespace BackendCore7.Models
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        public string Name { get; set; }
        [Required]
        [StringLength(150)]
        public string Email { get; set; }
        [Required]
        [StringLength(150)]
        public string Phone { get; set; }
        [Required]
        [StringLength(150)]
        public string Title { get; set; }
        [Required]
        [StringLength(int.MaxValue)]
        public string Content { get; set; }
        public bool Status { get; set; }
        // Khóa ngoại cho người dùng tạo ra comment
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int? ParentContactId { get; set; }
        public Contact ParentContact { get; set; }

        public DateTime Create_At { get; set; }
        public DateTime Update_At { get; set; }
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }
        // Mối quan hệ với User
        public ApplicationUser CreatedBy { get; set; }
        public ApplicationUser UpdatedBy { get; set; }
        // Danh sách các phản hồi
        public ICollection<Contact> Replies { get; set; }

    }
}
