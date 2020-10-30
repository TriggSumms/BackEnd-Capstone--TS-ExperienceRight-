using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ExperienceRight_BackCapTS.Models;
using ExperienceRight_BackCapTS.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ExperienceRight_BackCapTS.Controllers
{
   
        //[Authorize]
        [Route("api/[controller]")]
        [ApiController]
        public class BusinessController : ControllerBase
        {
            private readonly IBusinessRepository _businessRepository;
            private readonly IUserProfileRepository _userProfileRepository;

            public BusinessController(IBusinessRepository businessRepository, IUserProfileRepository userProfileRepository)
            {
                _businessRepository = businessRepository;
                _userProfileRepository = userProfileRepository;

            }

            [HttpGet]
            public IActionResult Get()
            {
                var businessz = _businessRepository.GetAllBusinessz();
                return Ok(businessz);
            }

        //        [HttpGet("unapproved")]
        //        public IActionResult GetUnapproved()
        //        {
        //            var posts = _postRepository.GetAllUnapprovedPosts();
        //            return Ok(posts);
        //        }

        
       [HttpGet("categories/{id}")]
        public IActionResult GetByCategory(int id)
        {
            var catbusiness = _businessRepository.GetAllBusinessesByCategory(id);
            if (catbusiness == null)
            {
                return NotFound();
            }
            return Ok(catbusiness);
        }



        [HttpGet("{id}")]
            public IActionResult Get(int id)
            {
                var business = _businessRepository.GetBusinessById(id);
                if (business == null)
                {
                    return NotFound();
                }
                return Ok(business);
            }

        //[HttpPost]
        //public IActionResult Business(Business business)
        //{

        //    //review.CreateDateTime = DateTime.Now;
        //    _businessRepository.AddBusiness(business);
        //    return CreatedAtAction("Get", new { id = business.Id }, business);
        //}

        [HttpPost]
        public IActionResult Business(Business business)
        {
           var currentId = GetCurrentUserProfile();
            //review.CreateDateTime = DateTime.Now;
            _businessRepository.AddBusiness(business);
            return CreatedAtAction("Get", new { id = business.Id, userProfileId = currentId}, business);
        }


        [HttpPut("edit/{id}")]
            public IActionResult Put(int id, Business business)
            {
                if (id != business.Id)
                {
                    return BadRequest();
                }
                _businessRepository.UpdateBusiness(business);
                return NoContent();
            }

            [HttpDelete("delete/{id}")]
            public IActionResult Delete(int id)
            {
                _businessRepository.DeleteBusiness(id);
                return NoContent();
            }



        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetUserByFirebaseUserId(firebaseUserId);
        }

        // **Add the id with no slash before it in the route and do the same in the provider with the fetch call. 
        // Because React doesn't like it when it has to go down more than one level for the id.
        //[HttpGet("myreviews{id}")]
        //public IActionResult GetUserReviews(int id)
        //{
        //    var businessz = _businessRepository.GetAllBusinesszForSpecificUser(id);
        //    return Ok(businessz);
        //}



    }
    }

