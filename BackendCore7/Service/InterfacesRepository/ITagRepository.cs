using BackendCore7.Models;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface ITagRepository
    {
        List<Tag> GetAll();
        Tag GetById(int id);
        Task<Tag> Create(TagVM tagVM);
        void Delete(int id);
        void Update(int id,TagVM tagVM);
    }
}
