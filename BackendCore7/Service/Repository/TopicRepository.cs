using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BackendCore7.Service.Repository
{
    public class TopicRepository : ITopicsRepository
    {
        private readonly UserManager<ApplicationUser> _user;
        private readonly MyDbContext _context;

        public TopicRepository(UserManager<ApplicationUser> user,MyDbContext context) 
        {
            _user=user;
            _context=context;
        }

        public async Task<Topic> Create(TopicVM topicVM)
        {
            var topic= new Topic()
            {
                Image= topicVM.Image,
                CreatedById=topicVM.CreatedById,
                Name=topicVM.Name,
                Slug=topicVM.Slug,
                Status=topicVM.Status,
                UpdatedById = topicVM.UpdatedById,
                Description = topicVM.Description,

            };
            var emloyee = await _user.FindByIdAsync(topicVM.CreatedById);
            if (emloyee == null)
            {
                throw new NotImplementedException();

            }
            _context.Topics.Add(topic);
            _context.SaveChanges();

            return topic;
        }

        public void DeleteById(int id)
        {
            var _topic = _context.Topics.SingleOrDefault(x=>x.Id== id);
            if (_topic == null)
            {
                throw new NotImplementedException();

            }
            _context.Topics.Remove(_topic);
            _context.SaveChanges();

        }

        public List<Topic> GetAll()
        {
            var list = _context.Topics.AsQueryable();
            var result = list.Select(x=>new Topic()
            {
                Id = x.Id,
                Name = x.Name,
                Image=x.Image,
                Posts = x.Posts,
                Slug = x.Slug,
                Status = x.Status,
                Description = x.Description,
                CreatedById = x.CreatedById,
                UpdatedById = x.UpdatedById,
            });
            return result.ToList();
        }

        public Topic GetById(int id)
        {
            var topic= _context.Topics.SingleOrDefault(x=>x.Id==id);
            if (topic!=null)
            {
                return topic;
            }
            throw new NotImplementedException();

        }

        public void Update(TopicVM topicVM, int id)
        {
            var _topic= _context.Topics.SingleOrDefault(x=>x.Id==id);
            if (_topic!=null)
            {
                _topic.Name=topicVM.Name;
                _topic.Status=topicVM.Status;
                _topic.Description=topicVM.Description;
                _topic.UpdatedById=topicVM.UpdatedById;
                _topic.CreatedById=topicVM.CreatedById;
                _topic.Slug=topicVM.Slug;
                _topic.Image=topicVM.Image;
                
                _context.SaveChanges();
            }
        }
    }
}
