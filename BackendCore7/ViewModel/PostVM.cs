using BackendCore7.Models;
using System.ComponentModel.DataAnnotations;

namespace BackendCore7.ViewModel
{
    public class PostVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
    
        public string Description { get; set; }
    
        public string Detail { get; set; }
      
        public string Image { get; set; }
        public bool Status { get; set; }
        public int Topic_Id { get; set; }
        
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }
        // Mối quan hệ với User

    }
}
