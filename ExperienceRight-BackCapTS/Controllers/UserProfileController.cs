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
        private readonly IBusinessRepository _businessRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository, IUserTypeRepository userTypeRepository, IBusinessRepository businessRepository)
        {
            _userProfileRepository = userProfileRepository;
            _userTypeRepository = userTypeRepository;
            _businessRepository = businessRepository;
        }

        [HttpGet]
        public IActionResult GetAllUsersANDBusinessz()
        {
            return Ok(_userProfileRepository.GetAllUsersANDBusinessz());
        }



        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetUserORBusinessByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }



        [HttpGet("user/{id}")]
        public IActionResult GetUserProfileById(int id)
        {
            return Ok(_userProfileRepository.GetProfileById(id));
        }



        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            //userProfile.UserTypeId = UserType.Id;
           // userProfile.UserTypeId = UserType.Anonymous_ID;
            _userProfileRepository.AddUserProfile(userProfile);
            return CreatedAtAction(
                //nameof(GetUserProfile),
                nameof(GetByFirebaseUserId),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        //[HttpPost]
        //public IActionResult Post(UserProfile userProfile)
        //{
        //    userProfile.CreateDateTime = DateTime.Now;
        //    userProfile.UserTypeId = UserType.Anonymous_ID;
        //    _userProfileRepository.AddUserProfile(userProfile);
        //    return CreatedAtAction(
        //        nameof(GetUserProfile),
        //        new { firebaseUserId = userProfile.FirebaseUserId },
        //        userProfile);
        //}


        //[HttpPost("BusinessProfile")]
        //public IActionResult BusinessProfilePost(int id, UserProfile userProfile, Business business )
        //{

        //    //id = userProfile.Id;
        //    userProfile.CreateDateTime = DateTime.Now;
        //    userProfile.UserTypeId = UserType.Business_ID;
        //    //userProfile.IsActive = true;
        //    _userProfileRepository.AddBusinessProfile(userProfile, id);
        //    //_userProfileRepository.GetUserProfile(id);
        //    //_businessRepository.GetUserBusinessById(userProfileId);
        //    _businessRepository.AddBusiness(business);
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
