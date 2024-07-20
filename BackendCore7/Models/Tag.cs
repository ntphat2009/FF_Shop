namespace BackendCore7.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Status { get; set; }
        public ICollection<ProductTag> ProductTags { get; set; }
    }
}
