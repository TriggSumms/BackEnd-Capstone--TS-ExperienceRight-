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
    public class BusinessRepository : BaseRepository, IBusinessRepository
    {
        public BusinessRepository(IConfiguration config) : base(config) { }

        private Business NewBusinessFromReader(SqlDataReader reader)
        {
            return new Business()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                EstablishmentName = reader.GetString(reader.GetOrdinal("EstablishmentName")),
                Bio = reader.GetString(reader.GetOrdinal("Bio")),
                Address = reader.GetString(reader.GetOrdinal("Address")),
                HoursOfOperation = reader.GetString(reader.GetOrdinal("HoursOfOperation")),
                Phone = reader.GetString(reader.GetOrdinal("Phone")),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                Category = new Category()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
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
            };
        }

        public List<Business> GetAllBusinessz()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT b.Id, b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId, b.CategoryId,
                              
                              c.Name AS CategoryName,
                              
                              up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
                              up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation, up.UserTypeId, 

                              ut.Name AS UserTypeName

                         FROM Business b
                              
                              LEFT JOIN UserProfile up ON b.UserProfileId = up.id
                              LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                              LEFT JOIN Category c ON b.CategoryId = c.id
                       
                        ORDER BY EstablishmentName ASC";
                    var reader = cmd.ExecuteReader();

                    var businessz = new List<Business>();

                    while (reader.Read())
                    {
                        businessz.Add(NewBusinessFromReader(reader));
                    }

                    reader.Close();

                    return businessz;
                }
            };
        }
        //public List<Review> GetBusinessForSpecificUser(int userProfileId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                  SELECT r.Id, r.Title, r.Content, 
        //                      r.CreateDateTime, r.DateOfExperience, r.Rating,
        //                      r.FrequencyId, r.UserProfileId, r.BusinessId,

        //                      f.Name AS FrequencyOfVisit,

        //                      up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
        //                      up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation,
        //                      up.UserTypeId, 

        //                      ut.Name AS UserTypeName,

        //                      b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId, b.CategoryId,

        //                      c.Id, c.Name AS CategoryName

        //                 FROM Review r
        //                      LEFT JOIN Frequency f ON r.FrequencyId = f.id
        //                      LEFT JOIN UserProfile up ON r.UserProfileId = up.id
        //                      LEFT JOIN UserType ut ON up.UserTypeId = ut.id
        //                      LEFT JOIN Business b ON r.BusinessId = b.id
        //                      LEFT JOIN Category c ON b.CategoryId = c.id
        //                WHERE r.UserProfileId = @userProfileId
        //                ORDER BY up.CreateDateTime DESC";

        //            DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);

        //            var reader = cmd.ExecuteReader();

        //            var reviews = new List<Review>();

        //            while (reader.Read())
        //            {
        //                reviews.Add(NewReviewFromReader(reader));
        //            }

        //            reader.Close();

        //            return reviews;
        //        }
        //    };
        //}


        public Business GetBusinessById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT b.Id, b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId, b.CategoryId,
                              
                               c.Name AS CategoryName,
                              
                              up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
                              up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation, up.UserTypeId, 

                              ut.Name AS UserTypeName

                         FROM Business b
                              
                              LEFT JOIN UserProfile up ON b.UserProfileId = up.id
                              LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                              LEFT JOIN Category c ON b.CategoryId = c.id
                        
                        
                              WHERE b.id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Business business = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        business = NewBusinessFromReader(reader);
                    }

                    reader.Close();

                    return business;
                }
            }
        }

        public Business GetUserBusinessById(int id, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                              SELECT b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId, b.CategoryId,
                              
                              c.Id, c.Name AS CategoryName,
                              
                              up.FirstName, up.LastName, up.DisplayName, up.FirebaseUserId,
                              up.Email, up.CreateDateTime AS UserProfileCreationDate, up.ProfileImageLocation, up.UserTypeId, 

                              ut.Name AS UserTypeName

                         FROM Business b
                              
                              LEFT JOIN UserProfile up ON b.UserProfileId = up.id
                              LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                              LEFT JOIN Category c ON b.CategoryId = c.id
                       
                        WHERE b.id = @id AND b.UserProfileId = @userProfileId";

                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    Business business = null;

                    if (reader.Read())
                    {
                        business = NewBusinessFromReader(reader);
                    }

                    reader.Close();

                    return business;
                }
            }
        }


        public void AddBusiness(Business business)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Business(
                                EstablishmentName, Bio, Address, HoursOfOperation, Phone, UserProfileId, CategoryId)
                        OUTPUT INSERTED.ID
                        VALUES (
                                 @EstablishmentName, @Bio, @Address, @HoursOfOperation, @Phone, @UserProfileId, @CategoryId)";

                    
                    DbUtils.AddParameter(cmd, "@EstablishmentName", business.EstablishmentName);
                    DbUtils.AddParameter(cmd, "@Bio", business.Bio);
                    //DbUtils.AddParameter(cmd, "@ImageLocation", DbUtils.ValueOrDBNull(review.ImageLocation));
                    //DbUtils.AddParameter(cmd, "@CreateDateTime", DateTime.Now);
                    //DbUtils.AddParameter(cmd, "@DateOfExperience", DbUtils.ValueOrDBNull(business.DateOfExperience));
                    DbUtils.AddParameter(cmd, "@Address", business.Address);
                    DbUtils.AddParameter(cmd, "@HoursOfOperation", business.HoursOfOperation);
                    DbUtils.AddParameter(cmd, "@Phone", business.Phone);
                    DbUtils.AddParameter(cmd, "@UserProfileId", business.UserProfileId);
                    DbUtils.AddParameter(cmd, "@CategoryId", business.CategoryId);

                    business.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateBusiness(Business business)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Business
                            SET 
                                EstablishmentName = @EstablishmentName,
                                Bio = @Bio,
                                Address = @Address,
                                HoursOfOperation = @HoursOfOperation,
                                Phone = @Phone,
                                UserProfileId = @UserProfileId,
                                CategoryId = @CategoryId
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", business.Id);
                    DbUtils.AddParameter(cmd, "@EstablishmentName", business.EstablishmentName);
                    DbUtils.AddParameter(cmd, "@Bio", business.Bio);
                    //DbUtils.AddParameter(cmd, "@ImageLocation", DbUtils.ValueOrDBNull(review.ImageLocation));
                    //DbUtils.AddParameter(cmd, "@CreateDateTime", DateTime.Now);
                    //DbUtils.AddParameter(cmd, "@DateOfExperience", DbUtils.ValueOrDBNull(business.DateOfExperience));
                    DbUtils.AddParameter(cmd, "@Address", business.Address);
                    DbUtils.AddParameter(cmd, "@HoursOfOperation", business.HoursOfOperation);
                    DbUtils.AddParameter(cmd, "@Phone", business.Phone);
                    DbUtils.AddParameter(cmd, "@UserProfileId", business.UserProfileId);
                    DbUtils.AddParameter(cmd, "@CategoryId", business.CategoryId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteBusiness(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Review
                            SET BusinessId = @businessId
                            WHERE BusinessId = @id
                        ";
                    cmd.Parameters.AddWithValue("@businessId", 1);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Business
                            WHERE Id = @id
                        ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();

                }
            }
        }
    }
}


