using BackendCore7.Models;
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
    public class BannersController : ControllerBase
    {
        private readonly IBannerRepository _bannerRepository;

        public BannersController(IBannerRepository bannerRepository) {
            _bannerRepository = bannerRepository;
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var listBanner = _bannerRepository.GetAll();
                var result = JsonSerializer.Serialize(listBanner);
                return Content(result,"application/json");
            }catch
            {
                return Content(null, "application/json");
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id) 
        {
            try
            {
                var item = _bannerRepository.GetById(id);
                var result = JsonSerializer.Serialize(item);
                return Ok(result);
            }catch
            {
                return Content(null, "application/json");
            }
        }
        [HttpPost]
        [Route("create-banner")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> CreateBanner(BannerVM bannerVM)
        {
            try
            {
                var banner =await _bannerRepository.Create(bannerVM);
                if(banner == null)
                {
                    return BadRequest();
                }
                else
                {
                    return Ok(banner);
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPut("{id}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> UpdateBanner(BannerVM bannerVM,int id)
        {
            try
            {
                _bannerRepository.UpdateById(bannerVM, id);
                return Ok("Update Success!");

            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpDelete("{id}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> DeleteBanner(int id)
        {
            try
            {
                _bannerRepository.DeleteById(id);
                return Ok("Delete Success!");
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
