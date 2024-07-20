using BackendCore7.Models;
using BackendCore7.ViewModel;

namespace BackendCore7.Service.InterfacesRepository
{
    public interface IProductRepository
    {
        List<ProductVM> GetAll(string? search, double? from, double? to, string? sortBy);
        ProductVM GetById(int id);
        Product GetDetail(int id);
        Task<Product> Create(ProductModel productM);
        void DeleteById(int id);
        void UpdateById(ProductModel product, int id);
        List<ProductVM> GetByCategoryId(int? categoryId);
        List<ProductVM> GetByTagId(int? tagId);

        List<ProductVM> GetByBrandId(int? brandId);
        //Task<IEnumerable<Tag>> GetTagsAsync();

    }
}
