using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using ExperienceRight_BackCapTS.Models;
using ExperienceRight_BackCapTS.Repositories;

namespace ExperienceRight_BackCapTS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IUserTypeRepository _userTypeRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository, IUserTypeRepository userTypeRepository)
        {
            _userProfileRepository = userProfileRepository;
            _userTypeRepository = userTypeRepository;
        }

        //[HttpGet]
        //public IActionResult Get()
        //{
        //    return Ok(_userProfileRepository.GetAllActive());
        //}

        //[HttpGet("inactive")]
        //public IActionResult GetInactive()
        //{
        //    return Ok(_userProfileRepository.GetAllInactive());
        //}

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("user/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetUserProfileById(id));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.Anonymous_ID;
            //userProfile.IsActive = true;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPut("{id}")]
        public ActionResult Put(UserProfile userProfile)
        {
            _userProfileRepository.UpdateUserProfile(userProfile);
            return NoContent();
        }

    }
}
