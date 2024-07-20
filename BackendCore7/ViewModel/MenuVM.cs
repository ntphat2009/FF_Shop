using BackendCore7.Models;
using System.ComponentModel.DataAnnotations;

namespace BackendCore7.ViewModel
{
    public class MenuVM
    {
        public string Name { get; set; }
      
        public string Link { get; set; }
      
        public bool Status { get; set; }
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }
        // Mối quan hệ với User
   
    }
}
