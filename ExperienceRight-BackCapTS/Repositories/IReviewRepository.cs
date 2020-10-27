using ExperienceRight_BackCapTS.Models;
using System.Collections.Generic;

namespace ExperienceRight_BackCapTS.Repositories
{
    public interface IReviewRepository
    {
        List<Review> GetAllReviews();
        public Review GetReviewsById(int id);
        void Add(Review review);
        void UpdateReview(Review review);
        void DeleteReview(int id);

        Review GetUserReviewsById(int id, int userProfileId);

        List<Review> GetAllReviewsForSpecificUser(int id);

        List<Review> GetAllReviewsForaSpecificBusinessId(int businessId);

        //List<Post> GetAllUnapprovedPosts();

    }
}