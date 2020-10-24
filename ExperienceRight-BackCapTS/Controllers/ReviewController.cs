//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Tabloid.Models;
//using Tabloid.Repositories;

//namespace Tabloid.Controllers
//{
//    [Authorize]
//    [Route("api/[controller]")]
//    [ApiController]
//    public class PostController : ControllerBase
//    {
//        private readonly IPostRepository _postRepository;
//        private readonly IUserProfileRepository _userProfileRepository;

//        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
//        {
//            _postRepository = postRepository;
//            _userProfileRepository = userProfileRepository;

//        }

//        [HttpGet]
//        public IActionResult Get()
//        {
//            var posts = _postRepository.GetAllApprovedPosts();
//            return Ok(posts);
//        }

//        [HttpGet("unapproved")]
//        public IActionResult GetUnapproved()
//        {
//            var posts = _postRepository.GetAllUnapprovedPosts();
//            return Ok(posts);
//        }

//        [HttpGet("{id}")]
//        public IActionResult Get(int id)
//        {
//            var post = _postRepository.GetPublishedPostById(id);
//            if (post == null)
//            {
//                return NotFound();
//            }
//            return Ok(post);
//        }

//        [HttpPost]
//        public IActionResult Post(Post post)
//        {
//            post.IsApproved = true;
//            post.CreateDateTime = DateTime.Now;
//            _postRepository.Add(post);
//            return CreatedAtAction("Get", new { id = post.Id }, post);
//        }

//        [HttpPut("edit/{id}")]
//        public IActionResult Put(int id, Post post)
//        {
//            if (id != post.Id)
//            {
//                return BadRequest();
//            }
//            _postRepository.UpdatePost(post);
//            return NoContent();
//        }

//        [HttpDelete("delete/{id}")]
//        public IActionResult Delete(int id)
//        {
//            _postRepository.DeletePost(id);
//            return NoContent();
//        }

//        // **Add the id with no slash before it in the route and do the same in the provider with the fetch call. 
//        // Because React doesn't like it when it has to go down more than one level for the id.
//        [HttpGet("myposts{id}")]
//        public IActionResult GetUserPosts(int id)
//        {
//            var posts = _postRepository.GetAllApprovedPostsForUser(id);
//            return Ok(posts);
//        }

        

//    }
//}