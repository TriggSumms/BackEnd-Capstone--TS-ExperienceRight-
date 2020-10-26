using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using ExperienceRight_BackCapTS.Models;
using ExperienceRight_BackCapTS.Repositories;

namespace ExperienceRight_BackCapTS.Controllers
{
    //[Authorize]
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

        [HttpGet]
        public IActionResult GetAllUsersANDBusinessz()
        {
            return Ok(_userProfileRepository.GetAllUsersANDBusinessz());
        }

        [HttpGet("customer/{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetUserByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("business/{firebaseUserId}")]
        public IActionResult GetBusinessProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetBusinessByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("user/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetProfileById(id));
        }

        //[HttpPost("UserProfile")]
        //public IActionResult UserProfilePost(UserProfile userProfile)
        //{
        //    userProfile.CreateDateTime = DateTime.Now;
        //    userProfile.UserTypeId = UserType.Anonymous_ID;
        //    //userProfile.IsActive = true;
        //    _userProfileRepository.AddUserProfile(userProfile);
        //    return CreatedAtAction(
        //        nameof(GetUserProfile),
        //        new { firebaseUserId = userProfile.FirebaseUserId },
        //        userProfile);
        //}

        //[HttpPost("BusinessProfile")]
        //public IActionResult BusinessProfilePost(UserProfile userProfile)
        //{
        //    userProfile.CreateDateTime = DateTime.Now;
        //    userProfile.UserTypeId = UserType.Business_ID;
        //    //userProfile.IsActive = true;
        //    _userProfileRepository.AddBusinessProfile(userProfile);
        //    return CreatedAtAction(
        //        nameof(GetUserProfile),
        //        new { firebaseUserId = userProfile.FirebaseUserId },
        //        userProfile);
        //}

        //[HttpPut("{id}")]
        //public ActionResult Put(UserProfile userProfile)
        //{
        //    _userProfileRepository.UpdateUserProfile(userProfile);
        //    return NoContent();
        //}

    }
}
