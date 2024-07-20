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
    public class MenuController : ControllerBase
    {
        private readonly IMenuRepository _menu;

        public MenuController(IMenuRepository menu) 
        { 
            _menu=menu;
        }
        [HttpGet]
        public IActionResult GetAllMenu()
        {
            try
            {
                var list = _menu.GetAll();
                var result = JsonSerializer.Serialize(list);
                return Content(result, "application/json");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetMenu(int id)
        {
            try
            {
                var list = _menu.GetById(id);
                var result = JsonSerializer.Serialize(list);
                return Content(result, "application/json");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost]
        [Route("create-menu")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateMenu(MenuVM MenuVM)
        {
            try
            {
                var post = await _menu.Create(MenuVM);
                return Ok(post);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }

        }
        [HttpPut]
        [Route("update-menu")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateMenu(MenuVM MenuVM, int id)
        {
            try
            {
                _menu.Update(MenuVM, id);
                return Ok("Update success!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteMenu(int id)
        {
            try
            {
                _menu.Delete(id);
                return Ok("Delete success!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
    }
}
