using BackendCore7.Models;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface IProductAttributesRepository
    {
        List<ProductAttributes> GetProductAttributes();
        Task<ProductAttributes> Create(ProductAttributesVM productAttributesVM);
        ProductAttributes GetById(int id);

        void Delete(int id);
        void Update(ProductAttributesVM productAttributesVM,int id);
    }
}
