using System.ComponentModel.DataAnnotations;

namespace BackendCore7.Models
{
    public class Post
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(1000)]
        public string Title { get; set; }
        [Required]
        [StringLength(int.MaxValue)]

        public string Description { get; set; }
        [Required]
        [StringLength(int.MaxValue)]

        public string Detail { get; set; }
        
        public string Image { get; set; }
        public bool Status { get; set; }
        public int Topic_Id { get; set; }
        public Topic Topic { get; set; }
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }
        // Mối quan hệ với User
        public ApplicationUser CreatedBy { get; set; }
        public ApplicationUser UpdatedBy { get; set; }

    }
}
