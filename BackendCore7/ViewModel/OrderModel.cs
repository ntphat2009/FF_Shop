using BackendCore7.Models;
using System.ComponentModel.DataAnnotations;

namespace BackendCore7.ViewModel
{
    public class OrderModel
    {
        public int Id { get; set; }

     
        public string DeliveryName { get; set; }

       
        public string DeliveryGender { get; set; }

        public string DeliveryEmail { get; set; }

       
        public string DeliveryPhone { get; set; }

      
        public string DeliveryAddress { get; set; }

        public string Note { get; set; }

        public string Status { get; set; }
        public double Amount { get; set; }
      

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public ICollection<OrderDetailModel> OrderDetails { get; set; }
    }
}
