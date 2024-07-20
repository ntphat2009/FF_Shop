using BackendCore7.Models;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface IBannerRepository
    {
        List<Banner> GetAll( );
        Banner GetById(int id);
        Task<Banner>Create(BannerVM bannerVM);
        void DeleteById(int id);
        void UpdateById(BannerVM bannerVM ,int id);
    }
}
