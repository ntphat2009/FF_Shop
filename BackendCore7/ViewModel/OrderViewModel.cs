using BackendCore7.Models;

namespace BackendCore7.ViewModel
{
    public class OrderViewModel
    {
        public string DeliveryName { get; set; }
        public string DeliveryGender { get; set; }
        public string DeliveryEmail { get; set; }
        public string DeliveryPhone { get; set; }
        public string DeliveryAddress { get; set; }
        public double? Amount { get; set; } 
        public string Note { get; set; }
        public string Status { get; set; }
        public string UserId { get; set; }

        public List<OrderItemViewModel> OrderItems { get; set; }


    }
}
