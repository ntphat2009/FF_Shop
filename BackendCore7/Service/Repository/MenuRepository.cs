using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Identity;

namespace BackendCore7.Service.Repository
{
    public class MenuRepository : IMenuRepository
    {
        private readonly UserManager<ApplicationUser> _user;
        private readonly MyDbContext _context;

        public MenuRepository(UserManager<ApplicationUser> user,MyDbContext context)
        {
            _user=user;
            _context=context;
        }
        public async Task<Menu> Create(MenuVM menuVM)
        {
            var user =await _user.FindByIdAsync(menuVM.CreatedById);
            if (user == null)
            {
                return null;
            }
            var menu=new Menu() 
            { 
                Name = menuVM.Name,
                Link = menuVM.Link,
                Status = menuVM.Status,
              
                CreatedById = menuVM.CreatedById,
                UpdatedById = menuVM.UpdatedById
                
            };
            _context.Menus.Add(menu);
            _context.SaveChanges();
            return menu;
        }

        public void Delete(int id)
        {
            var menu= _context.Menus.SingleOrDefault(x=>x.Id==id);
            if (menu!=null)
            {
                _context.Menus.Remove(menu);
                _context.SaveChanges();
            }
           
        }

        public List<Menu> GetAll()
        {
            var list= _context.Menus.AsQueryable();
            var result = list.Select(x => new Menu()
            {
                Id=x.Id,
                Name = x.Name,
                Link = x.Link,
                Status = x.Status,
             
                CreatedById = x.CreatedById,
                UpdatedById = x.UpdatedById

            });
            return result.ToList();
        }

        public Menu GetById(int id)
        {
            var result =_context.Menus.SingleOrDefault(x=>x.Id==id);
            if(result!=null)
            {
                return result;
            }
            return null;
        }

        public void Update(MenuVM menuVM, int id)
        {
            var menu= _context.Menus.SingleOrDefault(x=>x.Id== id);
            if (menu!=null)
            {
                menu.Status = menuVM.Status;
              
                menu.CreatedById = menuVM.CreatedById;
                menu.UpdatedById = menuVM.UpdatedById;
                menu.Name = menuVM.Name;
                menu.Link = menuVM.Link;
                _context.SaveChanges();

            }
        }
    }
}
