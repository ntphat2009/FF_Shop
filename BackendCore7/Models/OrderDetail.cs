using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BackendCore7.Models
{
    public class OrderDetail
    {
        [Key] 
        public int Id { get; set; }

        public int? OrderId { get; set; }
        [JsonIgnore]
        public Order Order { get; set; }
        public int? ProductId { get; set; }
        [JsonIgnore]
        public Product Product { get; set; }
        [Required]
        public double? Price { get; set; }
        [Required]
        public int? Qty { get; set; }
        
        [Range(0,100)]
        public double? Disount { get; set; }
        public double? Amount { get; set; }

    }
}
