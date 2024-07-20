using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;


namespace BackendCore7.Service.Repository
{

    public class CategoryRepository : ICategoryRepository
    {
        private readonly MyDbContext _context;
        private readonly UserManager<ApplicationUser> _user;

        public CategoryRepository(MyDbContext context, UserManager<ApplicationUser> user)
        {
            _context = context;
            _user = user;
        }

        public async Task<Category> Create(CategoryVM categoryVM)
        {
            var user = await _user.FindByIdAsync(categoryVM.CreatedById);
            if (user == null)
            {
                return null;
            }

            var category = new Category
            {
                Name = categoryVM.Name,
                Description = categoryVM.Description,
                Image = categoryVM.Image,
                Status = categoryVM.Status,
                Create_At = DateTime.Now,
                Update_At = DateTime.Now,
                ParentId = categoryVM.ParentId,
                CreatedById = categoryVM.CreatedById,
                UpdatedById = categoryVM.CreatedById
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }

        public void DeleteById(int id)
        {
            var cate = _context.Categories.SingleOrDefault(c => c.Id == id);
            if (cate != null)
            {
                _context.Remove(cate);
                _context.SaveChanges();
            }
        }

        public List<Category> GetAll()
        {
            //var list=new List<Category>();
            var cateList = _context.Categories.Include(p => p.Products).AsQueryable();
            var result = cateList.Select(x => new Category()
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Image = x.Image,
                Status = x.Status,
                CreatedById = x.CreatedById,
                UpdatedById = x.UpdatedById,
                Products = x.Products,
            });
            return result.ToList();

        }

        public Category GetById(int id)
        {
            var category = _context.Categories.SingleOrDefault(category => category.Id == id);
            if (category != null)
            {
                return category;
            }
            return null;
        }

        public void UpdateById(CategoryVM categoryVM, int id)
        {
            var _category = _context.Categories.SingleOrDefault(x => x.Id == id);
            if (_category != null)
            {
                _category.Name = categoryVM.Name;
                _category.Description = categoryVM.Description;

                _category.Update_At = DateTime.UtcNow;
                _category.UpdatedById = categoryVM.UpdatedById;
                _category.ParentId = categoryVM.ParentId;
                _category.Image = categoryVM.Image;
                _category.Status = categoryVM.Status;
                _context.SaveChanges();

            }
        }


    }
}
