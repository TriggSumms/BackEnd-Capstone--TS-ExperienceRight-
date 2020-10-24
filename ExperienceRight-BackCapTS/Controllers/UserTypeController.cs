using Microsoft.AspNetCore.Mvc;
using ExperienceRight_BackCapTS.Repositories;

namespace ExperienceRight_BackCapTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTypeController : ControllerBase
    {
        private readonly IUserTypeRepository _userTypeRepository;
        public UserTypeController( IUserTypeRepository userTypeRepository)
        {
            _userTypeRepository = userTypeRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userTypeRepository.GetAllUserTypes());
        }

    }
}
