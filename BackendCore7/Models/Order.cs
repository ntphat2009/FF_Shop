using System.ComponentModel.DataAnnotations;

namespace BackendCore7.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(150)]
        public string? Delivery_Name { get; set; }
        [Required]
        [StringLength(150)]
        public string? Delivery_Gender { get; set; }
        [Required]
        [StringLength(150)]
        public string? Delivery_Email { get; set; }
        [Required]
        [StringLength(150)]
        public string? Delivery_Phone { get; set; }
        [Required]
        [StringLength(150)]
        public string? Delivery_Address { get; set; }
        public string? Note { get; set; }
        public string? Status { get; set; }
        public double? Amount { get; set; }
   
        public string? UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
       
    }
}
