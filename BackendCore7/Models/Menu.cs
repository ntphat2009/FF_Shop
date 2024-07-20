using System.ComponentModel.DataAnnotations;

namespace BackendCore7.Models
{
    public class Menu
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        public string Name { get; set; }
        [Required]
        [StringLength(150)]
        public string Link { get; set; }
        //public int? ParentId { get; set; } // Nullable
        //public Menu ParentMenu { get; set; }
        //public ICollection<Menu> SubMenus { get; set; }
        //public string Type { get; set; }
        public bool Status { get; set; }
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }
        // Mối quan hệ với User
        public ApplicationUser CreatedBy { get; set; }
        public ApplicationUser UpdatedBy { get; set; }
    }
}
