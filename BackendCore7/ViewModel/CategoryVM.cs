using BackendCore7.Models;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace BackendCore7.ViewModel
{
    public class CategoryVM
    {
        
       
        //public ICollection<Product> Products { get; set; }
        public string Name { get; set; }

        [Required(ErrorMessage = "Mô tả là trường bắt buộc")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Ảnh là trường bắt buộc")]
        [StringLength(100, ErrorMessage = "Đường dẫn ảnh không được vượt quá 100 ký tự")]
        public string Image { get; set; }

        public bool Status { get; set; }

        public DateTime Create_At { get; set; }

        public DateTime Update_At { get; set; }

        public int? ParentId { get; set; } // Nullable

        //public CategoryVM ParentCategory { get; set; }

        //public List<CategoryVM> SubCategories { get; set; }

        public string CreatedById { get; set; }

        public string UpdatedById { get; set; }

        //public UserVM CreatedBy { get; set; }

        //public UserVM UpdatedBy { get; set; }

        
    }
}
