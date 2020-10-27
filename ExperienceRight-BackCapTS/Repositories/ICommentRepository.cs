using ExperienceRight_BackCapTS.Models;
using System.Collections.Generic;

namespace ExperienceRight_BackCapTS.Repositories
{
    public interface ICommentRepository
    {
        void AddComment(Comment comment);
        void DeleteComment(int id);
        List<Comment> GetAllComments();
        List<Comment> GetAllReviewComments(int reviewId);
        Comment GetCommentById(int id);
        void UpdateComment(Comment comment);
    }
}