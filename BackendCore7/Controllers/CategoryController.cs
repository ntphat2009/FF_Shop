using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace BackendCore7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _cate;

        public CategoryController(ICategoryRepository cate) 
        {
            _cate=cate;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var cateList= _cate.GetAll();
                var json = JsonSerializer.Serialize(cateList);

                return Content(json, "application/json");
              //  return Ok(cateList);
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
                var cate = _cate.GetById(id);
                var json = JsonSerializer.Serialize(cate);

                return Content(json, "application/json");
                
            }
            catch
            {
                return NotFound();
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public IActionResult Delete(int id)
        {
            try
            {
                _cate.DeleteById(id);
                return Ok();
            }
            catch
            {
                return NotFound();
            }
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> Create(CategoryVM categoryVM)
        {
            try
            {
                var category = await _cate.Create(categoryVM);
                if (category != null)
                {
                    return Ok(category);
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

        public IActionResult Update(int id, CategoryVM category)
        {
           
            try
            {
                _cate.UpdateById(category,id);
                return Ok(category);
            }
            catch
            {
                return StatusCode(500, "Internal server error.");
            }
        }

    }
}
