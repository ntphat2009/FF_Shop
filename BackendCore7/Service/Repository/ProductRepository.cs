using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BackendCore7.Service
{
    public class ProductRepository : IProductRepository
    {
        private readonly UserManager<ApplicationUser> _user;
        private readonly MyDbContext _context;
        //public static int PAGE_SIZE { get; set; } = 2;
        public ProductRepository(MyDbContext context, UserManager<ApplicationUser> user)
        {
            _user = user;
            _context = context;
        }
        public async Task<Product> Create(ProductModel productVM)
        {
            var user = await _user.FindByIdAsync(productVM.CreatedById);
            var _category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == productVM.CategoryId);
            var _brand = await _context.Brands.FirstOrDefaultAsync(c => c.Id == productVM.BrandId);

            if (_category == null || _brand == null || _user == null)
            {
                return null;
            }
            var _product = new Product
            {
                Name = productVM.Name,
                Price = productVM.Price,
                Description = productVM.Description,
                //Discount = productVM.Discount,
                CategoryId = productVM.CategoryId,
                BrandId = productVM.BrandId,
                Status = productVM.Status,
                Image = productVM.Image,
                CreatedById = productVM.CreatedById,
                UpdatedById = productVM.UpdatedById,
                ShortDesc = productVM.ShortDes,
                ImageDes = productVM.ImageDes,
            };
            // Create ProductAttributes and associate with Product
            var productAttributes = new ProductAttributes
            {
                Width = productVM.Width,
                Height = productVM.Height,
                Material = productVM.Material,
                Color = productVM.Color,
                Policy = productVM.Policy,
                //Product = _product // Associate ProductAttributes with Product
                ProductId = _product.Id // Sử dụng Id của Product mới tạo
            };

            _product.ProductAttributes = productAttributes;
            _product.ProductTags = productVM.TagIds.Select(tagId => new ProductTag { TagId = tagId }).ToList();
            _context.Products.Add(_product);
            await _context.SaveChangesAsync();
            return _product;
        }
        public void DeleteById(int id)
        {
            var _product = _context.Products.FirstOrDefault(p => p.Id == id);

            if (_product != null)
            {
                _context.Products.Remove(_product);
                _context.SaveChanges();
            }

        }
        public List<ProductVM> GetAll(string? search, double? from, double? to, string? sortBy)
        {

            var productList = _context.Products
                .Include(p => p.ProductAttributes)
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.ProductTags)
                .ThenInclude(p => p.Tag)
                .AsQueryable();
            if (!string.IsNullOrEmpty(search))
            {
                productList = productList.Where(x => x.Name.Contains(search));
            }
            if (from.HasValue && to.HasValue)
            {
                productList = productList.Where(x => x.Price <= to && x.Price >= from);
            }
            if (!string.IsNullOrEmpty(sortBy))
            {
                switch (sortBy)
                {
                    case "name_desc":
                        productList = productList.OrderBy(x => x.Name);
                        break;
                    case "name_asc":
                        productList = productList.OrderByDescending(x => x.Name);
                        break;
                    case "price_desc":
                        productList = productList.OrderBy(x => x.Price);
                        break;
                    case "price_asc":
                        productList = productList.OrderByDescending(x => x.Price);
                        break;
                }
            }
            var result = productList.Select(x => new ProductVM()
            {
                ProductId = x.Id,
                Name = x.Name,
                Price = x.Price,
                Description = x.Description,
                Image = x.Image,
                ImageDes = x.ImageDes,
                ShortDesc = x.ShortDesc,
                //Discount = x.Discount,
                CategoryId = x.CategoryId,
                CategoryName = x.Category.Name,
                BrandId = x.BrandId,
                BrandName = x.Brand.Name,
                Status = x.Status,
                CreatedById = x.CreatedById,
                UpdatedById = x.UpdatedById,
                Material = x.ProductAttributes.Material,
                Color = x.ProductAttributes.Color,
                Policy = x.ProductAttributes.Policy,
                Height = x.ProductAttributes.Height,
                Width = x.ProductAttributes.Width,
                ProductTags = x.ProductTags.Select(p => new ProductTagVM()
                {
                    TagId = p.TagId,
                    TagName = p.Tag.Name,
                }).ToList(),

            });
            return result.ToList();
        }
        public List<ProductVM> GetByBrandId(int? brandId)
        {
            if (brandId == null)
            {
                return new List<ProductVM>();
            }

            var productsInCategory = _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductTags)
                .ThenInclude(p => p.Tag)
                .Where(p => p.BrandId == brandId).AsQueryable();

            var result = productsInCategory.Select(x => new ProductVM()
            {
                ProductId = x.Id,
                Name = x.Name,
                Price = x.Price,
                Description = x.Description,
                //Discount = x.Discount,
                Status = x.Status,
                Image = x.Image,
                CategoryId = x.CategoryId,
                CategoryName = x.Category.Name,
                BrandId = x.BrandId,
                BrandName = x.Brand.Name,
                ProductTags = x.ProductTags.Select(p => new ProductTagVM()
                {
                    TagId = p.TagId,
                    TagName = p.Tag.Name,

                }).ToList()
            });

            return result.ToList();
        }
        public List<ProductVM> GetByCategoryId(int? categoryId)
        {
            if (categoryId == null)
            {
                return new List<ProductVM>();
            }

            var productsInCategory = _context.Products
                .Include(p => p.Category)
                .Include(p => p.ProductTags)
                .ThenInclude(p => p.Tag)
                .Where(p => p.CategoryId == categoryId).AsQueryable();

            var result = productsInCategory.Select(x => new ProductVM()
            {
                ProductId = x.Id,
                Name = x.Name,
                Price = x.Price,
                Description = x.Description,
                //Discount = x.Discount,
                Status = x.Status,
                Image = x.Image,
                CategoryId = x.CategoryId,
                CategoryName = x.Category.Name,
                BrandId = x.BrandId,
                BrandName = x.Brand.Name,
                ProductTags = x.ProductTags.Select(p => new ProductTagVM()
                {
                    TagId = p.TagId,
                    TagName = p.Tag.Name,

                }).ToList()
            });

            return result.ToList();
        }
        public Product GetDetail(int id)
        {
            var product = _context.Products.SingleOrDefault(p => p.Id == id);
            if (product != null)
            {
                return product;
            }
            return null;
        }
        public ProductVM GetById(int id)
        {
            var product = _context.Products
                .Include(p => p.ProductAttributes)
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .Include(p => p.ProductTags)
                .ThenInclude(p => p.Tag)
                .FirstOrDefault(p => p.Id == id);
            if (product != null)
            {
                var result = new ProductVM()
                {
                    ProductId = product.Id,
                    Name = product.Name,
                    Price = product.Price,
                    Description = product.Description,
                    ShortDesc = product.ShortDesc,
                    ImageDes = product.ImageDes,
                    Image = product.Image,
                    //Discount = x.Discount,
                    CategoryId = product.CategoryId,
                    CategoryName = product.Category.Name,
                    BrandId = product.BrandId,
                    BrandName = product.Brand.Name,
                    Status = product.Status,
                    CreatedById = product.CreatedById,
                    UpdatedById = product.UpdatedById,
                    Color = product.ProductAttributes?.Color,
                    Material = product.ProductAttributes?.Material,
                    Height = product.ProductAttributes?.Height,
                    Width = product.ProductAttributes?.Width,
                    Policy = product.ProductAttributes?.Policy,
                    ProductTags = product.ProductTags.Select(p => new ProductTagVM()
                    {
                        TagId = p.TagId,
                        TagName = p.Tag.Name,

                    }).ToList()

                };
                return result;
            }
            return null;
        }
        public void UpdateById(ProductModel product, int id)
        {
            var _product = _context.Products.Include(p => p.ProductTags).Include(p => p.ProductAttributes).FirstOrDefault(p => p.Id == id);
            if (_product != null)
            {
                _product.Name = product.Name;
                _product.Price = product.Price;
                _product.Description = product.Description;
                _product.CategoryId = product.CategoryId;
                _product.BrandId = product.BrandId;
                _product.Image = product.Image;
                _product.Status = product.Status;
                _product.UpdatedById = product.UpdatedById;
                _product.ShortDesc = product.ShortDes;
                _product.ImageDes = product.ImageDes;
                _product.Updated_At = DateTime.UtcNow;

                var productAttributes = _context.ProductAttributes.FirstOrDefault(pa => pa.ProductId == id);
                if (productAttributes != null)
                {
                    productAttributes.Width = product.Width;
                    productAttributes.Height = product.Height;
                    productAttributes.Material = product.Material;
                    productAttributes.Color = product.Color;
                    productAttributes.Policy = product.Policy;
                }
                else
                {
                    // If ProductAttributes do not exist, create new ones
                    productAttributes = new ProductAttributes
                    {
                        Width = product.Width,
                        Height = product.Height,
                        Material = product.Material,
                        Color = product.Color,
                        Policy = product.Policy,
                        ProductId = _product.Id // Use existing Product Id
                    };
                    _context.ProductAttributes.Add(productAttributes);
                }

                // Remove old tags
                _context.ProductTags.RemoveRange(_product.ProductTags);

                // Add new tags
                _product.ProductTags = product.TagIds.Select(tagId => new ProductTag { ProductId = id, TagId = tagId }).ToList();

                _context.SaveChanges();
            }
        }

        public List<ProductVM> GetByTagId(int? tagId)
        {
            if (tagId == null)
            {
                return new List<ProductVM>();
            }

            var productsInTag = _context.Products
                .Include(p => p.ProductTags)
                .ThenInclude(p => p.Tag)
                .Where(p => p.ProductTags.Any(x => x.TagId == tagId)).AsQueryable();

            var result = productsInTag.Select(x => new ProductVM()
            {
                ProductId = x.Id,
                Name = x.Name,
                Price = x.Price,
                Description = x.Description,
                //Discount = x.Discount,
                Status = x.Status,
                Image = x.Image,
                CategoryId = x.CategoryId,
                CategoryName = x.Category.Name,
                BrandId = x.BrandId,
                BrandName = x.Brand.Name,
                ProductTags = x.ProductTags.Select(p => new ProductTagVM()
                {
                    TagId = p.TagId,
                    TagName = p.Tag.Name,

                }).ToList()
                //(List<ProductTagVM>)
            });

            return result.ToList();
        }
    }
}
