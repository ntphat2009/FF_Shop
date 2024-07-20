using BackendCore7.Models;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface IMenuRepository
    {
        List<Menu> GetAll();
        Menu GetById(int id);
        Task<Menu> Create(MenuVM menuVM);
        void Delete(int id);
        void Update(MenuVM menuVM,int id);
    }
}
