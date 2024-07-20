using System.ComponentModel.DataAnnotations;

namespace BackendCore7.ViewModel
{
    public class OrderDetailModel
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public OrderModel Order { get; set; }

        public int ProductId { get; set; }

        public ProductModel Product { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public int Qty { get; set; }

        [Range(0, 100)]
        public double Discount { get; set; }

        public double Amount { get; set; }
    }
}
