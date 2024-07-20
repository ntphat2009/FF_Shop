using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendCore7.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [StringLength(100)]
        public string Image { get; set; }
        public bool Status { get; set; }

        public DateTime Create_At { get; set; }
        public DateTime Update_At { get; set; }
        public int? ParentId { get; set; } // Nullable
        public Category ParentCategory { get; set; }
        public ICollection<Category> SubCategories { get; set; }
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }
        // Mối quan hệ với User
        public ApplicationUser CreatedBy { get; set; }
        public ApplicationUser UpdatedBy { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
