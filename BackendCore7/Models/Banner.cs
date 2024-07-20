using System.ComponentModel.DataAnnotations;

namespace BackendCore7.Models
{
    public class Banner
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]

        public string Image { get; set; }
        [Required]
        [StringLength(50)]

       
       
        public string Position { get; set; }
        public bool Status { get; set; }
    }
}
