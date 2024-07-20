using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace BackendCore7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductAttributeController : ControllerBase
    {
        private readonly IProductAttributesRepository _productAttributes;

        public ProductAttributeController(IProductAttributesRepository productAttributes) 
        {
            _productAttributes= productAttributes;
        }
        [HttpGet]
        public IActionResult GetAll() 
        {
            try
            {
                var list = _productAttributes.GetProductAttributes();
                var result = JsonSerializer.Serialize(list);
                return Content(result,"application/json");
            }
            catch 
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                var list = _productAttributes.GetById(id);
                var result = JsonSerializer.Serialize(list);
                return Content(result, "application/json");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost]
        [AllowAnonymous]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> CreateAttributes(ProductAttributesVM productAttributesVM) 
        {
            try
            {
                var result=await  _productAttributes.Create(productAttributesVM);
                return Ok(result);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPut]
        [AllowAnonymous]
        [Authorize(Roles ="Admin")]
        public IActionResult Update(ProductAttributesVM productAttributesVM,int id)
        {
            try
            {
                _productAttributes.Update(productAttributesVM,id);
                return Ok("Update success");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpDelete]
        [AllowAnonymous]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteAttributes( int id)
        {
            try
            {
                _productAttributes.Delete(id);
                return Ok("Delete success");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
