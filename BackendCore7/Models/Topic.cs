using System.ComponentModel.DataAnnotations;

namespace BackendCore7.Models
{
    public class Topic
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        public string Name { get; set; }
        [StringLength(50)]

        public string Slug { get; set; }
        public string? Image { get; set; }

        public string Description { get; set; }
        public bool Status { get; set; }
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }

        // Mối quan hệ với User
        public ApplicationUser CreatedBy { get; set; }
        public ApplicationUser UpdatedBy { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}
