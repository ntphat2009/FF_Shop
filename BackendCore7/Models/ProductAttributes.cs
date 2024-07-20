using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BackendCore7.Models
{
    public class ProductAttributes
    {
        [Key]
        public int Id { get; set; }
        public string Width { get; set; }
        public string Height { get; set; }
        public string Material { get; set; }
        public string Color { get; set; }
        public string Policy { get; set; }
        public Product Product { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }
    }
}
