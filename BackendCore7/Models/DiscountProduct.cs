using System.ComponentModel.DataAnnotations;

namespace BackendCore7.Models
{
    public class DiscountProduct
    {
        public int Id { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        [Range(0, 100)]
        public double Discount {  get; set; }
        [Required]
        public DateTime Date_Begin { get; set; }
        [Required]
        public DateTime Date_End { get; set;}
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }
        // Mối quan hệ với User
        public ApplicationUser CreatedBy { get; set; }
        public ApplicationUser UpdatedBy { get; set; }
        //public int Product_Id { get; set; }
        //public Product Product { get; set; }

    }
}
