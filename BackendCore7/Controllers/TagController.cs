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
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tag;

        public TagController(ITagRepository tag) { _tag = tag; }
        [HttpGet]
        public IActionResult GetAllTag()
        {
            try
            {
                var list = _tag.GetAll();
                var result = JsonSerializer.Serialize(list);
                return Content(result, "application/json");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetTag(int id)
        {
            try
            {
                var list = _tag.GetById(id);
                var result = JsonSerializer.Serialize(list);
                return Content(result, "application/json");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost]
        [Route("create-tag")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateTag(TagVM tagVM)
        {
            try
            {
                var post = await _tag.Create(tagVM);
                return Ok("Create success!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }

        }
        [HttpPut]
        [Route("update-post")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateTag(TagVM tagVM, int id)
        {
            try
            {
                _tag.Update( id,tagVM);
                return Ok("Update success!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteTag(int id)
        {
            try
            {
                _tag.Delete(id);
                return Ok("Delete success!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
    }
}
