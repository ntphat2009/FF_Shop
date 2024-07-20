using BackendCore7.Models;
using System.ComponentModel.DataAnnotations;

namespace BackendCore7.ViewModel
{
    public class ProductVM
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte Discount { get; set; }
        public double Price { get; set; }
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string BrandName { get; set; }
        public int? BrandId { get; set; }
        public string Image { get; set; }
        public string ImageDes { get; set; }
        public string ShortDesc { get; set; }
        public bool Status { get; set; }
        //public ApplicationUser CreatedBy { get; set; }

        //public ApplicationUser UpdatedBy { get; set; }
        public string CreatedById { get; set; }

        public string UpdatedById { get; set; }
        //public string CreatedBy { get; set;}
        //public IEnumerable<ProductTag> productTags { get; set; }
        public List<ProductTagVM> ProductTags { get; set; }
        public string Color { get; set; }
        public string Policy { get; set; }
        public string Material { get; set; }
        public string Height {  get; set; }
        public string Width { get; set; }

    }
}
