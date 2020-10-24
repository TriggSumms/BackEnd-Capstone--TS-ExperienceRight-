using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ExperienceRight_BackCapTS.Models;
using ExperienceRight_BackCapTS.Utils;

namespace ExperienceRight_BackCapTS.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ProfileImageLocation, up.UserTypeId, 
                               ut.Name AS UserTypeName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ProfileImageLocation = DbUtils.GetString(reader, "ProfileImageLocation"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        //public List<UserProfile> GetAllActive()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //               SELECT up.id, up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, up.Email,
        //                      up.CreateDateTime, up.IsActive, up.ProfileImageLocation, up.UserTypeId, 
        //                      ut.[Name] AS UserTypeName
        //                 FROM UserProfile up
        //                      LEFT JOIN UserType ut ON up.UserTypeId = ut.id
        //                WHERE IsActive = 1
        //                    ORDER BY DisplayName
        //                ";
        //            var reader = cmd.ExecuteReader();
        //            var userProfile = new List<UserProfile>();

        //            while (reader.Read())
        //            {
        //                userProfile.Add(new UserProfile()

        //                {
        //                    Id = DbUtils.GetInt(reader, "Id"),
        //                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
        //                    FirstName = DbUtils.GetString(reader, "FirstName"),
        //                    LastName = DbUtils.GetString(reader, "LastName"),
        //                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
        //                    Email = DbUtils.GetString(reader, "Email"),
        //                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
        //                    ProfileImageLocation = DbUtils.GetString(reader, "ProfileImageLocation"),
        //                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
        //                    UserType = new UserType()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "UserTypeId"),
        //                        Name = DbUtils.GetString(reader, "UserTypeName"),
        //                    }
        //                });
        //            }

        //            reader.Close();

        //            return userProfile;
        //        }
        //    }
        //}

        //public List<UserProfile> GetAllInactive()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //               SELECT up.id, up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, up.Email,
        //                      up.CreateDateTime, up.IsActive, up.ProfileImageLocation, up.UserTypeId,
        //                      ut.[Name] AS UserTypeName
        //                 FROM UserProfile up
        //                      LEFT JOIN UserType ut ON up.UserTypeId = ut.id
        //                WHERE IsActive = 0
        //                    ORDER BY DisplayName
        //                ";
        //            var reader = cmd.ExecuteReader();
        //            var userProfile = new List<UserProfile>();

        //            while (reader.Read())
        //            {
        //                userProfile.Add(new UserProfile()

        //                {
        //                    Id = DbUtils.GetInt(reader, "Id"),
        //                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
        //                    FirstName = DbUtils.GetString(reader, "FirstName"),
        //                    LastName = DbUtils.GetString(reader, "LastName"),
        //                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
        //                    Email = DbUtils.GetString(reader, "Email"),
        //                    CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
        //                    ProfileImageLocation = DbUtils.GetString(reader, "ProfileImageLocation"),
        //                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
        //                    UserType = new UserType()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "UserTypeId"),
        //                        Name = DbUtils.GetString(reader, "UserTypeName"),
        //                    }
                           
        //                });
        //            }

        //            reader.Close();

        //            return userProfile;
        //        }
        //    }
        //}

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, 
                                                                 Email, CreateDateTime, ProfileImageLocation, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
                                                @Email, @CreateDateTime, @ProfileImageLocation, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@ProfileImageLocation", userProfile.ProfileImageLocation);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);
                   

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public UserProfile GetUserProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    {
                        cmd.CommandText = @"SELECT 
                              u.id, u.FirebaseUserId, u.FirstName, u.LastName, u.DisplayName, u.Email, 
                              u.CreateDateTime, u.ProfileImageLocation, u.UserTypeId,
                              ut.[Name] AS UserTypeName
                         FROM UserProfile u
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE u.Id = @id";

                        cmd.Parameters.AddWithValue("@id", id);
                        var reader = cmd.ExecuteReader();


                        if (reader.Read())
                        {
                            UserProfile userProfile = new UserProfile
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
                                Email = reader.GetString(reader.GetOrdinal("Email")),
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName")),
                                DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                                ProfileImageLocation = DbUtils.GetNullableString(reader, "ProfileImageLocation"),
                                UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                UserType = new UserType()
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                                    Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                                },

                            };
                            reader.Close();
                            return userProfile;
                        }
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        public void UpdateUserProfile(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE UserProfile
                            SET 
                                Email = @email, 
                                FirebaseUserId = @firebaseUserId,
                                FirstName = @firstName, 
                                LastName = @lastName,
                                DisplayName = @displayName,
                                CreateDateTime = @createDateTime,
                                ProfileImageLocation = @profileImageLocation, 
		                        UserTypeId = @userTypeId
                            WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", userProfile.Id);
                    cmd.Parameters.AddWithValue("@email", userProfile.Email);
                    cmd.Parameters.AddWithValue("@firebaseUserId", userProfile.FirebaseUserId);
                    cmd.Parameters.AddWithValue("@firstName", userProfile.FirstName);
                    cmd.Parameters.AddWithValue("@lastName", userProfile.LastName);
                    cmd.Parameters.AddWithValue("@displayName", userProfile.DisplayName);
                    cmd.Parameters.AddWithValue("@createDateTime", userProfile.CreateDateTime);
                    cmd.Parameters.AddWithValue("@profileImageLocation", DbUtils.ValueOrDBNull(userProfile.ProfileImageLocation));
                    cmd.Parameters.AddWithValue("@userTypeId", userProfile.UserTypeId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}



