using System.ComponentModel.DataAnnotations;

namespace BackendCore7.ViewModel
{
    public class BannerVM
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public bool Status { get; set; }
        public string Position { get; set; }
    }
}
