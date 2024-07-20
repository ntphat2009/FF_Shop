using System.ComponentModel.DataAnnotations;

namespace BackendCore7.Models
{
    public class Brand
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
       
        [Required]
        [StringLength(100)]

        public string Image { get; set;}
        [Required]

        public string Description { get; set; }
        public bool Status { get; set; }

        public DateTime Create_At { get; set; }
        public DateTime Update_At { get; set; }
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }

        // Mối quan hệ với User
        public ApplicationUser CreatedBy { get; set; }
        public ApplicationUser UpdatedBy { get; set; }
        public ICollection<Product>Products { get; set; }
    }
}
