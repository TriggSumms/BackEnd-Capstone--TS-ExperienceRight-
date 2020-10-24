using Microsoft.AspNetCore.Mvc;

namespace ExperienceRight_BackCapTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public IActionResult Hello()
        {
            return Content("Wow, your so handsome....Great job once again Super handsome boi");
        }
    }
}
