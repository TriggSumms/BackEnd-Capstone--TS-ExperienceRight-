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
   // [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IReviewRepository _reviewRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public CommentController(ICommentRepository commentRepository, IReviewRepository reviewRepository,
            IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _reviewRepository = reviewRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("review/{reviewId}")]
        public IActionResult GetAllReviewComments(int reviewId)
        {
            var comments = _commentRepository.GetAllReviewComments(reviewId);
            return Ok(comments);
        }

        
        [HttpGet("{id}")]
        public IActionResult GetCommentById(int id)
        {
            return Ok(_commentRepository.GetCommentById(id));
        }


        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_commentRepository.GetAllComments());
        }



        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.AddComment(comment);
            return base.Created("", comment); //returns the comment, not including headers
        }

        [HttpPut("edit/{id}")]
        public IActionResult Put(int id, Comment comment)
        {

            if (id != comment.Id)
            {
                return BadRequest();
            }
            _commentRepository.UpdateComment(comment);
            return Ok();
        }


        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.DeleteComment(id);
            return NoContent();
        }
    }
}




