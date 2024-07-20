using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BackendCore7.Models
{
    public class ApplicationUser:IdentityUser
    {
       
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Image {  get; set; }
        public string? ImageUrl { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? GoogleId { get; set; }

        //public string Facebook { get; set; }
        //public string Youtube { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Category> Categories { get; set; }
        public ICollection<Product> Products { get; set; }
        public ICollection<Brand> Brands { get; set; }



    }
}
