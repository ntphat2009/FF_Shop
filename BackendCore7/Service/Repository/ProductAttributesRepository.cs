using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.Repository
{
    public class ProductAttributesRepository : IProductAttributesRepository
    {
        private readonly MyDbContext _context;

        public ProductAttributesRepository(MyDbContext context) 
        {
            _context=context;
        }
        public async Task<ProductAttributes> Create(ProductAttributesVM productAttributesVM)
        {
            var productAttributes = new ProductAttributes() 
            {
                Color = productAttributesVM.Color,
                Height = productAttributesVM.Height,
                Material = productAttributesVM.Material,
                Policy = productAttributesVM.Policy,
                Width = productAttributesVM.Width,
            };
            _context.ProductAttributes.Add(productAttributes);
            await _context.SaveChangesAsync();
            return productAttributes;
        }

        public void Delete(int id)
        {
            var item= _context.ProductAttributes.SingleOrDefault(x => x.Id==id);
            if (item!=null)
            {
                _context.ProductAttributes.Remove(item);
                _context.SaveChanges();
            }
            
        }

        public ProductAttributes GetById(int id)
        {
            var item= _context.ProductAttributes.SingleOrDefault(x => x.Id==id);
            if (item!=null)
            {
                return item;
            }
            return null;
        }

        public List<ProductAttributes> GetProductAttributes()
        {
            var list = _context.ProductAttributes.AsQueryable();
            var result = list.Select(x => new ProductAttributes()
            {
                Id = x.Id,
                Color=x.Color,
                Height = x.Height,
                Material=x.Material,
                Policy = x.Policy,
                Width = x.Width,

            }).ToList();
            return result;
         
        }

        public void Update(ProductAttributesVM productAttributesVM, int id)
        {
            var item = _context.ProductAttributes.SingleOrDefault( x => x.Id==id);
            if (item!=null)
            {
               
                item.Width = productAttributesVM.Width;
                item.Height = productAttributesVM.Height;
                item.Material = productAttributesVM.Material;
                item.Policy = productAttributesVM.Policy;
                item.Width = productAttributesVM.Width;
                item.Height = productAttributesVM.Height;
                _context.SaveChanges();
            }
        }
    }
}
