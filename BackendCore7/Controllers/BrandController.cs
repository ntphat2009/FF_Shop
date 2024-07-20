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
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brand;

        public BrandController(IBrandRepository brand)
        {
            _brand = brand;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var brandList = _brand.GetAll();
                var json = JsonSerializer.Serialize(brandList);    

                return Content(json, "application/json");
                //  return Ok(brandList);
            }
            catch
            {
                return Content(null, "application/json");
            }
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                var brand = _brand.GetById(id);
                var json = JsonSerializer.Serialize(brand);

                return Content(json, "application/json");

            }
            catch
            {
                return NotFound();
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles ="Admin")]
        public IActionResult Delete(int id)
        {
            try
            {
                _brand.DeleteById(id);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> Create(BrandVM brandgoryVM)
        {
            try
            {
                var brandgory = await _brand.Create(brandgoryVM);
                if (brandgory != null)
                {
                    return Ok(brandgory);
                }
                else
                {
                    return BadRequest("Invalid CreatedById.");
                }
            }
            catch
            {
                return StatusCode(500, "Internal server error.");
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]

        public IActionResult Update(int id, BrandVM brandgory)
        {

            try
            {
                _brand.UpdateById(brandgory, id);
                return Ok(brandgory);
            }
            catch
            {
                return StatusCode(500, "Internal server error.");
            }
        }

    }
}

