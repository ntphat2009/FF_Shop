using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Identity;

namespace BackendCore7.Service.Repository
{
    public class TagRepository:ITagRepository
    {
        private readonly UserManager<ApplicationUser> _user;
        private readonly MyDbContext _context;

        public TagRepository(UserManager<ApplicationUser> user,MyDbContext context) 
        {
            _user=user;
            _context=context;
        }

        public async Task<Tag> Create(TagVM tagVM)
        {
            var tag=new Tag() 
            {
                Name=tagVM.Name,
                Status=tagVM.Status,
            };
            _context.Tags.Add(tag);
            _context.SaveChanges();
            return tag;
        }

        public void Delete(int id)
        {
            var tag= _context.Tags.SingleOrDefault(t => t.Id==id);
            if (tag!=null)
            {
                _context.Tags.Remove(tag);
                _context.SaveChanges();
            }
        }

        public List<Tag> GetAll()
        {
            var list= _context.Tags.AsQueryable();
            var result = list.Select(x => new Tag()
            {
                Id=x.Id,
                Name=x.Name,
                Status=x.Status,
            });
            return result.ToList();
        }

        public Tag GetById(int id)
        {
            var tag = _context.Tags.SingleOrDefault(x => x.Id==id);
            if(tag!=null)
            {
                return tag;
            }
            return null;
        }

        public void Update(int id, TagVM tagVM)
        {
            var tag= _context.Tags.SingleOrDefault(x=>x.Id==id);
            if (tag != null)
            {
                tag.Name=tagVM.Name;
                tag.Status=tagVM.Status;
                _context.SaveChanges();
            }
        }
    }
}
