using BackendCore7.Models;
using BackendCore7.Service.InterfacesRepository;
using BackendCore7.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Text.Json;

namespace BackendCore7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _post;

        public PostController(IPostRepository post) 
        {
           _post=post;
        }
        [HttpGet]
        public IActionResult GetAllPost()
        {
            try
            {
                var list = _post.GetAll();
                var result = JsonSerializer.Serialize(list);
                return Content(result,"application/json");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError); 
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetPost(int id)
        {
            try
            {
                var list = _post.GetById(id);
                var result = JsonSerializer.Serialize(list);
                return Content(result, "application/json");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpGet("topic/{topicid}")]
        public IActionResult PostByTopicId(int topicid)
        {
            try
            {
                var list = _post.GetPostByTopicId(topicid);
                var result = JsonSerializer.Serialize(list);
                return Content(result, "application/json");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost]
        [Route("create-post")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> CreatePost(PostVM postVM)
        {
            try
            {
                var post = await _post.Create(postVM);
                return Ok(post);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError,postVM);

            }

        }
        [HttpPut]
        [Route("update-post")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdatePost(PostVM postVM, int id)
        {
            try
            {
                _post.Update(postVM,id);
                return Ok("Update success!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        [HttpDelete]
        [Authorize(Roles ="Admin")]
        public IActionResult DeletePost(int id)
        {
            try
            {
                _post.Delete( id);
                return Ok("Delete success!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }

    }
}
