namespace BackendCore7.ViewModel
{
    public class BrandVM
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public bool Status { get; set; }
        public DateTime Create_At { get; set; }
        public DateTime Update_At { get; set; }
        public string CreatedById { get; set; }
        public string UpdatedById { get; set; }
    }
}
