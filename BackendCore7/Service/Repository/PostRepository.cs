using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel;

namespace BackendCore7.Service.Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly MyDbContext _context;
        private readonly UserManager<ApplicationUser> _user;

        public PostRepository(MyDbContext context,UserManager<ApplicationUser> user)
        { 
            _context=context;
            _user=user;
        }
        public async Task<Post> Create(PostVM postVM)
        {
            var user = await _user.FindByIdAsync(postVM.CreatedById);
            if (user == null)
            {
                return null;
            }
            var post = new Post()
            {
                CreatedById = postVM.CreatedById,
                Description = postVM.Description,
                Detail = postVM.Detail,
                Image = postVM.Image,
                Status = postVM.Status,
                Title = postVM.Title,
                Topic_Id = postVM.Topic_Id,
                UpdatedById = postVM.UpdatedById
            };
            _context.Posts.Add(post);
            _context.SaveChanges();
            return post;
        }

        public void Delete(int id)
        {
            var post = _context.Posts.SingleOrDefault(x => x.Id == id);
            if (post != null)
            {
                _context.Posts.Remove(post);
                _context.SaveChanges();
            }
        }

        public List<Post> GetAll()
        {
           var list= _context.Posts.AsQueryable();
            var result = list.Select(x => new Post()
            {
                Id= x.Id,
                Title = x.Title,
                Description = x.Description,
                CreatedById = x.CreatedById,
                UpdatedById = x.UpdatedById,
                Detail=x.Detail,
                Image=x.Image,
                Status=x.Status,
                Topic_Id=x.Topic_Id,
            });
            return result.ToList();
        }

        public Post GetById(int id)
        {

            var list = _context.Posts.SingleOrDefault(p=>p.Id==id);
            if (list!=null)
            {
               
                return list;
            }
            return null;
           
        }

        public List<PostVM> GetPostByTopicId(int id)
        {

            var post = _context.Posts.Include(p => p.Topic).Where(p => p.Topic_Id == id).AsQueryable();
            if (post == null)
            {
                return null;
            }
            var result = post.Select(x => new PostVM()
            {
                Id=x.Id,
                Title = x.Title,
                Description = x.Description,
                CreatedById = x.CreatedById,
                UpdatedById = x.UpdatedById,
                Detail=x.Detail,
                Image=x.Image,
                Status=x.Status,
                Topic_Id=x.Topic_Id,
                
            }).ToList();
            return result;
        }

        public void Update(PostVM postVM, int id)
        {
            var post = _context.Posts.SingleOrDefault(x=>x.Id==id);
            if(post!=null)
            {
                post.Title=postVM.Title;
                post.Description=postVM.Description;
                post.CreatedById=postVM.CreatedById;
                post.UpdatedById=postVM.UpdatedById;
                post.Detail=postVM.Detail;
                post.Image=postVM.Image;
                post.Status=postVM.Status;
                post.Topic_Id = postVM.Topic_Id;
                _context.SaveChanges();
            }
            
        }
    }
}
