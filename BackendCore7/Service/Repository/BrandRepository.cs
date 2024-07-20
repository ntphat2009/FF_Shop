using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BackendCore7.Service.Repository
{
    public class BrandRepository : IBrandRepository
    {
        private readonly UserManager<ApplicationUser> _user;
        private readonly MyDbContext _context;

        public BrandRepository(UserManager<ApplicationUser> user, MyDbContext context)
        {
            _user = user;
            _context = context;
        }
        public async Task<Brand> Create(BrandVM brandVM)
        {
            var user = await _user.FindByIdAsync(brandVM.CreatedById);
            if (user == null)
            {
                return null;
            }

            var brand = new Brand
            {
                Name = brandVM.Name,
                Description = brandVM.Description,
                Image = brandVM.Image,
                Status = brandVM.Status,
                Create_At = DateTime.Now,
                Update_At = DateTime.Now,
                CreatedById = brandVM.CreatedById,
                UpdatedById = brandVM.CreatedById
            };

            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();

            return brand;
        }

        public void DeleteById(int id)
        {
            var items = _context.Brands.SingleOrDefault(c => c.Id == id);
            if (items != null)
            {
                _context.Remove(items);
                _context.SaveChanges();
            }
        }

        public List<Brand> GetAll()
        {
            //var list=new List<Category>();
            var cateList = _context.Brands.Include(p => p.Products).AsQueryable();
            var result = cateList.Select(x => new Brand()
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
        public Brand GetById(int id)
        {
            var item = _context.Brands.SingleOrDefault(item => item.Id == id);
            if (item != null)
            {
                return item;
            }
            return null;
        }

        public void UpdateById(BrandVM brandVM, int id)
        {
            var _item = _context.Brands.SingleOrDefault(x => x.Id == id);
            if (_item != null)
            {
                _item.Name = brandVM.Name;
                _item.Description = brandVM.Description;

                _item.Update_At = DateTime.UtcNow;
                _item.UpdatedById = brandVM.UpdatedById;
                _item.Image = brandVM.Image;
                _item.Status = brandVM.Status;
                _context.SaveChanges();

            }
        }
    }
}
