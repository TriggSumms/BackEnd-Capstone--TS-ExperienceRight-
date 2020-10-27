using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ExperienceRight_BackCapTS.Models;
using ExperienceRight_BackCapTS.Utils;
using System.Data.SqlClient;

namespace ExperienceRight_BackCapTS.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }

        private Comment NewCommentFromReader(SqlDataReader reader)
        {
            return new Comment()
            {
                Id = reader.GetInt32(reader.GetOrdinal("CommentId")),
                Subject = reader.GetString(reader.GetOrdinal("Subject")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ProfileImageLocation = DbUtils.GetNullableString(reader, "ProfileImageLocation"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                },
                ReviewId = reader.GetInt32(reader.GetOrdinal("ReviewId")),
                Review = new Review()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
                    Title = reader.GetString(reader.GetOrdinal("Title")),
                    Content = reader.GetString(reader.GetOrdinal("Content")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    DateOfExperience = DbUtils.GetNullableDateTime(reader, "DateOfExperience"),
                    //Not sure about Rating
                    Rating = reader.GetInt32(reader.GetOrdinal("Rating")),
                    FrequencyId = reader.GetInt32(reader.GetOrdinal("FrequencyId")),
                    Frequency = new Frequency()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("FrequencyId")),
                        Name = reader.GetString(reader.GetOrdinal("FrequencyOfVisit"))
                    }
                }
                //BusinessId = reader.GetInt32(reader.GetOrdinal("BusinessId")),
                //Business = new Business()
                //{
                //    Id = DbUtils.GetInt(reader, "BusinessId"),
                //    EstablishmentName = DbUtils.GetString(reader, "EstablishmentName"),
                //    Bio = DbUtils.GetString(reader, "Bio"),
                //    Address = DbUtils.GetString(reader, "Address"),
                //    HoursOfOperation = DbUtils.GetString(reader, "HoursOfOperation"),
                //    Phone = DbUtils.GetString(reader, "Phone"),
                //    UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                //    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                //    Category = new Category()
                //    {
                //        Id = DbUtils.GetInt(reader, "CategoryId"),
                //        Name = DbUtils.GetString(reader, "CategoryName")
                //    }
                //}
            };

        }

        public List<Comment> GetAllReviewComments(int reviewId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id AS CommentId, c.Subject, c.Content, c.CreateDateTime,
                                   c.ReviewId, c.UserProfileId,

                                   r.Id, r.Title, r.Content, 
                                   r.CreateDateTime, r.DateOfExperience, r.Rating,
                                   r.FrequencyId, r.UserProfileId, r.BusinessId,
                              
                                   f.Name AS FrequencyOfVisit,


                                   up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
                                   up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation,
                                   up.UserTypeId, 

                                   ut.Name AS UserTypeName

                              FROM Comment c
                                   LEFT JOIN Review r ON c.ReviewId = r.id
                                   LEFT JOIN Frequency f ON r.FrequencyId = f.id
                                   LEFT JOIN UserProfile up ON c.UserProfileId = up.id
                                   LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                              WHERE ReviewId = @id
                              ORDER BY c.CreateDateTime DESC";
                    cmd.Parameters.AddWithValue("@id", reviewId);
                    var reader = cmd.ExecuteReader();

                    List<Comment> comments = new List<Comment>();

                    while (reader.Read())
                    {
                        comments.Add(NewCommentFromReader(reader));
                    }

                    reader.Close();

                    return (comments);
                }
            }
        }

        public List<Comment> GetAllComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, ReviewId, UserProfileId, Subject, Content, CreateDateTime
                        FROM Comment
                        ORDER BY CreateDateTime DESC;";

                    var reader = cmd.ExecuteReader();

                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ReviewId = DbUtils.GetInt(reader, "ReviewId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime")
                        });
                    }
                    reader.Close();
                    return comments;
                }
            }
        }

        public Comment GetCommentById(int id)

        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"

                        SELECT c.Id, c.ReviewId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                               up.Email, up.DisplayName, up.FirstName, up.LastName, up.ProfileImageLocation,
                               up.CreateDateTime AS UserProfileCreationDate, up.FirebaseUserId, up.UserTypeId,
                               ut.Name AS UserTypeName
                        FROM Comment c
                        LEFT JOIN UserProfile up on c.UserProfileId = up.Id
                        LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                        WHERE c.Id = @id
                        ORDER BY c.CreateDateTime DESC";
                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    Comment comment = null;
                    if (reader.Read())
                    {
                        comment = new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ReviewId = DbUtils.GetInt(reader, "ReviewId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Email = DbUtils.GetString(reader, "Email"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                ProfileImageLocation = DbUtils.GetNullableString(reader, "ProfileImageLocation"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileCreationDate"),
                                UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                UserType = new UserType()
                                {
                                    Id = DbUtils.GetInt(reader, "UserTypeId"),
                                    Name = DbUtils.GetString(reader, "UserTypeName")
                                }
                            },
                        };
                    }
                    reader.Close();
                    return comment;
                }
            }
        }






        public void AddComment(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              INSERT INTO Comment (
                                   Subject, Content, CreateDateTime, ReviewId, UserProfileId )
                              OUTPUT INSERTED.ID
                              VALUES (
                                   @Subject, @Content, @CreateDateTime, @ReviewId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@ReviewId", comment.ReviewId);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);

                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void UpdateComment(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                 UPDATE Comment
                                 SET
                                     Subject = @Subject,
                                     Content = @Content, 
                                     CreateDateTime = @CreateDateTime,
                                     ReviewId = @ReviewId,
                                     UserProfileId = @UserProfileId
                                 WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@ReviewId", comment.ReviewId);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@id", comment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void DeleteComment(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                 DELETE FROM Comment
                                 WHERE Id = @id
                             ";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}

    
    
