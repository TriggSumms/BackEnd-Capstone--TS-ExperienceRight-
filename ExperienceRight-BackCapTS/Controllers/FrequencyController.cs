using Microsoft.AspNetCore.Mvc;
using ExperienceRight_BackCapTS.Repositories;

namespace ExperienceRight_BackCapTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FrequencyController : ControllerBase
    {
        private readonly IFrequencyRepository _frequencyRepository;
        public FrequencyController(IFrequencyRepository frequencyRepository)
        {
            _frequencyRepository = frequencyRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_frequencyRepository.GetAllFrequencies());
        }

    }
}