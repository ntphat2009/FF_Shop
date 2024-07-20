using BackendCore7.Models;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        Post GetById( int id);
        Task<Post> Create(PostVM postVM);
        void Delete(int id);
        void Update(PostVM postVM,int id);
        List<PostVM> GetPostByTopicId(int id);
    }
}
