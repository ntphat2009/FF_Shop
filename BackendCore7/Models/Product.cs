using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendCore7.Models
{
    [Table("Product")]
    public class Product
    {

        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(250)]
        public string Name { get; set; }

        public string ShortDesc { get; set; }

        public string Description { get; set; }
        public string Image { get; set; }
        public string ImageDes { get; set; }
        public double Price { get; set; }
        public bool Status { get; set; }
        public DateTime Create_At { get; set; }
        public DateTime Updated_At { get; set; }
        
        public int? CategoryId { get; set; }
        public int? BrandId { get; set; }
        [JsonIgnore]
        public Category Category { get; set; }
        [JsonIgnore]

        public Brand Brand { get; set; }
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }
        // Mối quan hệ với User
  

        public ApplicationUser CreatedBy { get; set; }
       

        public ApplicationUser UpdatedBy { get; set; }
        //public ICollection<DiscountProduct> Discounts { get; set; }
        public ProductStore ProductStores { get; set; }
        public ICollection<ProductTag> ProductTags { get; set; }
        public ProductAttributes ProductAttributes { get; set; }

    }
}
