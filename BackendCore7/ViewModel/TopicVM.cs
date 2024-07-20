using BackendCore7.Models;
using System.ComponentModel.DataAnnotations;

namespace BackendCore7.ViewModel
{
    public class TopicVM
    {
        public string Image { get; set; }
        public string Name { get; set; }

        public string Slug { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }

    }
}
