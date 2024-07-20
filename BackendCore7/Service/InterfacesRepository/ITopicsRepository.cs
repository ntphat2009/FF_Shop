using BackendCore7.Models;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface ITopicsRepository
    {
        List<Topic> GetAll();
        Topic GetById(int id);
        Task<Topic> Create(TopicVM topicVM);
        void DeleteById(int id);
        void Update(TopicVM topicVM,int id);
    }
}
