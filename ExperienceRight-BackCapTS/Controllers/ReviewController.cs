using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ExperienceRight_BackCapTS.Models;
using ExperienceRight_BackCapTS.Repositories;

namespace ExperienceRight_BackCapTS.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public ReviewController(IReviewRepository reviewRepository, IUserProfileRepository userProfileRepository)
        {
            _reviewRepository = reviewRepository;
            _userProfileRepository = userProfileRepository;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var reviews = _reviewRepository.GetAllReviews();
            return Ok(reviews);
        }

        //        [HttpGet("unapproved")]
        //        public IActionResult GetUnapproved()
        //        {
        //            var posts = _postRepository.GetAllUnapprovedPosts();
        //            return Ok(posts);
        //        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var review = _reviewRepository.GetReviewsById(id);
            if (review == null)
            {
                return NotFound();
            }
            return Ok(review);
        }

        //BEGIN USER SPECIFIC LISTS
        [HttpGet("business{id}")]
        public IActionResult GetBuisnessSpecificReviews(int id)
        {
            var reviews = _reviewRepository.GetAllReviewsForaSpecificBusinessId(id);
            if (reviews == null)
            {
                return NotFound();
            }
            return Ok(reviews);
        }


        [HttpGet("userspecific{id}")]
        public IActionResult GetUserSpecificReviews(int id)
        {
            var reviews = _reviewRepository.GetAllReviewsForaSpecificUserId(id);
            if (reviews == null)
            {
                return NotFound();
            }
            return Ok(reviews);
        }
        //END USER SPECIFIC LISTS

        [HttpGet("search")]
        public IActionResult SearchReviewsByCategoryANDotherinfo(string q)
        {
            return Ok(_reviewRepository.SearchReviewsByCategoryANDotherinfo(q));
        }

        [HttpPost]
        public IActionResult Review(Review review)
        {
            
            review.CreateDateTime = DateTime.Now;
            _reviewRepository.Add(review);
            return CreatedAtAction("Get", new { id = review.Id }, review);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Review review)
        {
            if (id != review.Id)
            {
                return BadRequest();
            }
            _reviewRepository.UpdateReview(review);
            return NoContent();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _reviewRepository.DeleteReview(id);
            return NoContent();
        }

        // **Add the id with no slash before it in the route and do the same in the provider with the fetch call. 
        // Because React doesn't like it when it has to go down more than one level for the id.
        [HttpGet("myreviews{id}")]
        public IActionResult GetUserReviews(int id)
        {
            var reviews = _reviewRepository.GetAllReviewsForSpecificUser(id);
            return Ok(reviews);
        }



    }
}