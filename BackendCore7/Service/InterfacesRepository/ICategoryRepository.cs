using BackendCore7.Models;
using BackendCore7.ViewModel;
using System.Threading.Tasks;
namespace BackendCore7.Service.InterfacesRepository
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        Category GetById(int id);
        Task<Category> Create(CategoryVM categoryVM);
        void DeleteById(int id);
        void UpdateById(CategoryVM categoryVM, int id);

    }
}
