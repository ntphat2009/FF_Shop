using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.Repository
{
    public class BannerRepository : IBannerRepository
    {
        private readonly MyDbContext _context;

        public BannerRepository(MyDbContext context) {
            _context=context;
        }
        public async Task<Banner> Create(BannerVM bannerVM)
        {
            var banner = new Banner()
            {
                Name = bannerVM.Name,
                Image=bannerVM.Image,
                Status= bannerVM.Status,
                Position= bannerVM.Position,
            };
            _context.Banners.Add(banner);
            await _context.SaveChangesAsync();
            return banner;
        }

        public void DeleteById(int id)
        {
            var _banner = _context.Banners.SingleOrDefault(b => b.Id == id);
            if (_banner == null)
            {
                throw new NotImplementedException();

            }
            _context.Banners.Remove(_banner);
            _context.SaveChanges();
        }

        public List<Banner> GetAll( )
        {
            var list = _context.Banners.AsQueryable();
            var result = list.Select(x => new Banner()
            {
                Image = x.Image,
                Id = x.Id,

                Position = x.Position,
                Status = x.Status,
                Name = x.Name,
            });
            return result.ToList();
        }

        public Banner GetById(int id)
        {
           var _banner = _context.Banners.SingleOrDefault(x => x.Id == id);
            if (_banner == null)
            {
                throw new NotImplementedException();

            }
            return _banner;
        }

        public void UpdateById(BannerVM bannerVM, int id)
        {
            var _banner = _context.Banners.SingleOrDefault(x=>x.Id==id);
            if (_banner != null)
            {
            
                _banner.Name = bannerVM.Name;
                _banner.Image = bannerVM.Image;
                _banner.Position = bannerVM.Position;
                _banner.Status = bannerVM.Status;
                _context.SaveChanges();
            }
            


        }
    }
}
