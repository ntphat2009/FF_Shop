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
    public class TopicsController : ControllerBase
    {
        private readonly ITopicsRepository _topics;

        public TopicsController(ITopicsRepository topics) 
        { 
            _topics=topics;
        }
        [HttpGet]
        public IActionResult GetAllTopics() 
        {
            try
            {
                var list = _topics.GetAll();
                var result= JsonSerializer.Serialize(list);
                return Content(result,"application/json");
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetTopicsById(int id) 
        {
            try
            {
                var item = _topics.GetById(id);
                var result = JsonSerializer.Serialize(item);
                return Content(result, "application/json");
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> CreateTopic(TopicVM topicVM)
        {
            try
            {
                var resutl =await _topics.Create(topicVM);
                return Ok(resutl);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]

        public IActionResult UpdateTopics(TopicVM topicVM,int id) 
        {
            try
            {   
                _topics.Update(topicVM,id);
                return Ok("Update Success!");

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public IActionResult DeleteTopics(int id)
        {
            try
            {
                _topics.DeleteById(id);
                return Ok("Delete Success!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
