using BackendCore7.Context;
using BackendCore7.Models;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Text.Json;
using System.Globalization;
using BackendCore7.Service.InterfacesRepository;
using Microsoft.AspNetCore.Authorization;



namespace BackendCore7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        private readonly IProductRepository _productRepository;
        

        public ProductsController(IProductRepository productRepository,ICategoryRepository categoryRepository)
        {
            _productRepository = productRepository;
            
        }
        [HttpGet]
        public IActionResult GetAll(string? search, double? from, double? to, string? sortBy)
        {
            try
            {
                var productList = _productRepository.GetAll(search,from,to,sortBy);
              
                var json = JsonSerializer.Serialize(productList);

                return Content(json, "application/json");
                //return Ok(productList);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

        }
        [HttpGet("category/{categoryId}")]
        public ContentResult GetByCategoryId(int? categoryId)
        {
            try
            {
                var productList = _productRepository.GetByCategoryId(categoryId);
               

                var json = JsonSerializer.Serialize(productList);

                return Content(json, "application/json");
               
            }
            catch
            {
                return null;
            }
        }
        [HttpGet("tag/{tagId}")]
        public ContentResult GetByTagId(int? tagId)
        {
            try
            {
                var productList = _productRepository.GetByTagId(tagId);


                var json = JsonSerializer.Serialize(productList);

                return Content(json, "application/json");

            }
            catch
            {
                return null;
            }
        }
        [HttpGet("brand/{brandId}")]
        public ContentResult GetByBrandyId(int? brandId)
        {
            try
            {
                var productList = _productRepository.GetByBrandId(brandId);


                var json = JsonSerializer.Serialize(productList);

                return Content(json, "application/json");

            }
            catch
            {
                return null;
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var product = _productRepository.GetById(id);
                var json = JsonSerializer.Serialize(product);

                return Content(json, "application/json");
               
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> Create(ProductModel productM)
        {
            try
            {
                var product =await _productRepository.Create(productM);
                return Ok(product);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]

        public IActionResult Update(int id,ProductModel product)
        {
                try
                {

                    _productRepository.UpdateById(product,id);
                    return Ok();
                }
                catch
                {
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult Delete(int id)
        {
            try
            {
               _productRepository.DeleteById(id);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
