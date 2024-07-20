using BackendCore7.Models;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface IBrandRepository
    {
        List<Brand> GetAll();
        Brand GetById(int id);
        Task<Brand> Create(BrandVM brandVM);
        void DeleteById(int id);
        void UpdateById(BrandVM brandVM, int id);
    }
}
