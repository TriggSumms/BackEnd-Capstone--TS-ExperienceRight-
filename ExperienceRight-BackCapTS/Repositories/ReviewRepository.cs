using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using Microsoft.Extensions.Configuration;
using ExperienceRight_BackCapTS.Models;
using ExperienceRight_BackCapTS.Utils;
using System.Data.SqlClient;
using System.Data;

namespace ExperienceRight_BackCapTS.Repositories
{
    public class ReviewRepository : BaseRepository, IReviewRepository
    {
        public ReviewRepository(IConfiguration config) : base(config) { }


        private Review NewReviewFromReader(SqlDataReader reader)
        {
            return new Review()
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
                },
                //CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                //Category = new Category()
                //{
                //    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                //    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                //},
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("UserProfileCreationDate")),
                    ProfileImageLocation = DbUtils.GetNullableString(reader, "ProfileImageLocation"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                },
                BusinessId = reader.GetInt32(reader.GetOrdinal("BusinessId")),
                Business = new Business()
                {
                    Id = DbUtils.GetInt(reader, "BusinessId"),
                    EstablishmentName = DbUtils.GetString(reader, "EstablishmentName"),
                    Bio = DbUtils.GetString(reader, "Bio"),
                    Address = DbUtils.GetString(reader, "Address"),
                    HoursOfOperation = DbUtils.GetString(reader, "HoursOfOperation"),
                    Phone = DbUtils.GetString(reader, "Phone"),
                    UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                    Category = new Category()
                    {
                        Id = DbUtils.GetInt(reader, "CategoryId"),
                        Name = DbUtils.GetString(reader, "CategoryName")
                    }
                },
            };
        }
        public List<Review> GetAllReviews()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT r.Id, r.Title, r.Content, 
                              r.CreateDateTime, r.DateOfExperience, r.Rating,
                              r.FrequencyId, r.UserProfileId, r.BusinessId,
                              
                              f.Name AS FrequencyOfVisit,

                              up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
                              up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation,
                              up.UserTypeId, 

                              ut.Name AS UserTypeName,
                                
                              b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId, b.CategoryId,
                              
                              c.Id, c.Name AS CategoryName

                         FROM Review r
                              LEFT JOIN Frequency f ON r.FrequencyId = f.id
                              LEFT JOIN UserProfile up ON r.UserProfileId = up.id
                              LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                              LEFT JOIN Business b ON r.BusinessId = b.id
                              LEFT JOIN Category c ON b.CategoryId = c.id
                        
                        ORDER BY DateofExperience DESC";
                    var reader = cmd.ExecuteReader();

                    var reviews = new List<Review>();

                    while (reader.Read())
                    {
                        reviews.Add(NewReviewFromReader(reader));
                    }

                    reader.Close();

                    return reviews;
                }
            };
        }


        public List<Review> GetAllReviewsForSpecificUser(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT r.Id, r.Title, r.Content, 
                              r.CreateDateTime, r.DateOfExperience, r.Rating,
                              r.FrequencyId, r.UserProfileId, r.BusinessId,
                              
                              f.Name AS FrequencyOfVisit,

                              up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
                              up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation,
                              up.UserTypeId, 

                              ut.Name AS UserTypeName,
                                
                              b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId, b.CategoryId,
                              
                              c.Id, c.Name AS CategoryName

                         FROM Review r
                              LEFT JOIN Frequency f ON r.FrequencyId = f.id
                              LEFT JOIN UserProfile up ON r.UserProfileId = up.id
                              LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                              LEFT JOIN Business b ON r.BusinessId = b.id
                              LEFT JOIN Category c ON b.CategoryId = c.id
                        WHERE r.UserProfileId = @userProfileId
                        ORDER BY up.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();

                    var reviews = new List<Review>();

                    while (reader.Read())
                    {
                        reviews.Add(NewReviewFromReader(reader));
                    }

                    reader.Close();

                    return reviews;
                }
            };
        }
        public List<Review> GetAllReviewsForaSpecificBusinessId(int businessId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT r.Id, r.Title, r.Content, 
                              r.CreateDateTime, r.DateOfExperience, r.Rating,
                              r.FrequencyId, r.UserProfileId, r.BusinessId,
                              
                              f.Name AS FrequencyOfVisit,

                              up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
                              up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation,
                              up.UserTypeId, 

                              ut.Name AS UserTypeName,
                                
                              b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId, b.CategoryId,
                              
                              c.Id, c.Name AS CategoryName

                         FROM Review r
                              LEFT JOIN Frequency f ON r.FrequencyId = f.id
                              LEFT JOIN UserProfile up ON r.UserProfileId = up.id
                              LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                              LEFT JOIN Business b ON r.BusinessId = b.id
                              LEFT JOIN Category c ON b.CategoryId = c.id
                        WHERE r.BusinessId = @businessId
                        ORDER BY up.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@businessId", businessId);

                    var reader = cmd.ExecuteReader();

                    var reviews = new List<Review>();

                    while (reader.Read())
                    {
                        reviews.Add(NewReviewFromReader(reader));
                    }

                    reader.Close();

                    return reviews;
                }
            };
        }

        public List<Review> GetAllReviewsForaSpecificUserId(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT r.Id, r.Title, r.Content, 
                              r.CreateDateTime, r.DateOfExperience, r.Rating,
                              r.FrequencyId, r.UserProfileId, r.BusinessId,
                              
                              f.Name AS FrequencyOfVisit,

                              up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
                              up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation,
                              up.UserTypeId, 

                              ut.Name AS UserTypeName,
                                
                              b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId, b.CategoryId,
                              
                              c.Id, c.Name AS CategoryName

                         FROM Review r
                              LEFT JOIN Frequency f ON r.FrequencyId = f.id
                              LEFT JOIN UserProfile up ON r.UserProfileId = up.id
                              LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                              LEFT JOIN Business b ON r.BusinessId = b.id
                              LEFT JOIN Category c ON b.CategoryId = c.id
                        WHERE r.UserProfileId = @userProfileId
                        ORDER BY up.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);

                    var reader = cmd.ExecuteReader();

                    var reviews = new List<Review>();

                    while (reader.Read())
                    {
                        reviews.Add(NewReviewFromReader(reader));
                    }

                    reader.Close();

                    return reviews;
                }
            };
        }

        //public List<Post> GetAllUnapprovedPosts()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //               SELECT p.Id, p.Title, p.Content, 
        //                      p.ImageLocation AS HeaderImage,
        //                      p.CreateDateTime, p.PublishDateTime, p.IsApproved,
        //                      p.CategoryId, p.UserProfileId,

        //                      c.[Name] AS CategoryName,
        //                      u.FirstName, u.LastName, u.DisplayName, u.FirebaseUserId,
        //                      u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
        //                      u.UserTypeId, u.IsActive,
        //                      ut.[Name] AS UserTypeName
        //                 FROM Post p
        //                      LEFT JOIN Category c ON p.CategoryId = c.id
        //                      LEFT JOIN UserProfile u ON p.UserProfileId = u.id
        //                      LEFT JOIN UserType ut ON u.UserTypeId = ut.id
        //                WHERE IsApproved = 0 AND PublishDateTime < SYSDATETIME()
        //                ORDER BY PublishDateTime DESC";
        //            var reader = cmd.ExecuteReader();

        //            var posts = new List<Post>();

        //            while (reader.Read())
        //            {
        //                posts.Add(NewPostFromReader(reader));
        //            }

        //            reader.Close();

        //            return posts;
        //        }
        //    };
        //}


        ////public List<Post> GetAllUnapprovedPosts()


        ////      c.[Name] AS CategoryName,

        ////      u.FirstName, u.LastName, u.DisplayName, u.FirebaseUserId,
        ////      u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
        ////      u.UserTypeId, u.IsActive,

        ////      ut.[Name] AS UserTypeName
        //// FROM Post p
        ////      LEFT JOIN Category c ON p.CategoryId = c.id
        ////      LEFT JOIN UserProfile u ON p.UserProfileId = u.id
        ////      LEFT JOIN UserType ut ON u.UserTypeId = ut.id
        ////WHERE IsApproved = 0 AND PublishDateTime < SYSDATETIME()
        ////ORDER BY PublishDateTime DESC";

        public Review GetReviewsById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT r.Id, r.Title, r.Content, 
                              r.CreateDateTime, r.DateOfExperience, r.Rating,
                              r.FrequencyId, r.UserProfileId, r.BusinessId,
                              
                              f.Name AS FrequencyOfVisit,

                              up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
                              up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation,
                              up.UserTypeId, 

                              ut.Name AS UserTypeName,
                                
                              b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId, b.CategoryId,
                              
                              c.Id, c.Name AS CategoryName

                         FROM Review r
                              LEFT JOIN Frequency f ON r.FrequencyId = f.id
                              LEFT JOIN UserProfile up ON r.UserProfileId = up.id
                              LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                              LEFT JOIN Business b ON r.BusinessId = b.id
                              LEFT JOIN Category c ON b.CategoryId = c.id
                        WHERE DateOfExperience < SYSDATETIME()
                              AND r.id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Review review = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        review = NewReviewFromReader(reader);
                    }

                    reader.Close();

                    return review;
                }
            }
        }

        public Review GetUserReviewsById(int id, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT r.Id, r.Title, r.Content, 
                              r.CreateDateTime, r.DateOfExperience, r.Rating,
                              r.FrequencyId, r.UserProfileId, r.BusinessId,
                              
                              f.Name AS FrequencyOfVisit,

                              up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
                              up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation,
                              up.UserTypeId, 

                              ut.Name AS UserTypeName,
                                
                              b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId, b.CategoryId,
                              
                              c.Id, c.Name AS CategoryName

                         FROM Review r
                              LEFT JOIN Frequency f ON r.FrequencyId = f.id
                              LEFT JOIN UserProfile up ON r.UserProfileId = up.id
                              LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                              LEFT JOIN Business b ON r.BusinessId = b.id
                              LEFT JOIN Category c ON b.CategoryId = c.id
                        WHERE r.id = @id AND r.UserProfileId = @userProfileId";

                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    Review review = null;

                    if (reader.Read())
                    {
                        review = NewReviewFromReader(reader);
                    }

                    reader.Close();

                    return review;
                }
            }
        }


        public void Add(Review review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Review(
                                Title, Content,
                                CreateDateTime, DateOfExperience,
                                Rating, FrequencyId, UserProfileId, BusinessId )
                        OUTPUT INSERTED.ID
                        VALUES (
                                @Title, @Content,
                                @CreateDateTime, @DateOfExperience,
                                @Rating, @FrequencyId, @UserProfileId, @BusinessId )";

                    DbUtils.AddParameter(cmd, "@Title", review.Title);
                    DbUtils.AddParameter(cmd, "@Content", review.Content);
                    //DbUtils.AddParameter(cmd, "@ImageLocation", DbUtils.ValueOrDBNull(review.ImageLocation));
                    DbUtils.AddParameter(cmd, "@CreateDateTime", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@DateOfExperience", DbUtils.ValueOrDBNull(review.DateOfExperience));
                    DbUtils.AddParameter(cmd, "@Rating", review.Rating);
                    DbUtils.AddParameter(cmd, "@FrequencyId", review.FrequencyId);
                    DbUtils.AddParameter(cmd, "@BusinessId", review.BusinessId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", review.UserProfileId);

                    review.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateReview(Review review)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Review
                            SET 
                                Title = @title, 
                                Content = @content, 
                                DateOfExperience = @dateOfExperience,
                                Rating = @rating,
                                BusinessId = @businessId,
                               	FrequencyId = @frequencyId,
                                UserProfileId = @userProfileId
                            WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", review.Id);
                    DbUtils.AddParameter(cmd, "@Title", review.Title);
                    DbUtils.AddParameter(cmd, "@Content", review.Content);
                   // DbUtils.AddParameter(cmd, "@ImageLocation", DbUtils.ValueOrDBNull(post.ImageLocation));
                    DbUtils.AddParameter(cmd, "@DateOfExperience", DbUtils.ValueOrDBNull(review.DateOfExperience));
                    DbUtils.AddParameter(cmd, "@Rating", review.Rating);
                    DbUtils.AddParameter(cmd, "@FrequencyId", review.FrequencyId);
                    DbUtils.AddParameter(cmd, "@BusinessId", review.BusinessId);
                    DbUtils.AddParameter(cmd, "@UserProfileId", review.UserProfileId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteReview(int reviewId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            
                            DELETE FROM Comment WHERE ReviewId = @Id;
                            DELETE FROM Review WHERE Id = @Id";
                    
                    DbUtils.AddParameter(cmd, "@Id", reviewId);
                    cmd.ExecuteNonQuery();



                }
            }
        }
    }
}
