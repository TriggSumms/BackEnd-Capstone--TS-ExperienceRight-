using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ExperienceRight_BackCapTS.Models;
using ExperienceRight_BackCapTS.Utils;
using System.Data.SqlClient;
using System.Linq;

namespace ExperienceRight_BackCapTS.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        //private UserProfile NewUserProfileFromReader(SqlDataReader reader)
        //{
        //    return new UserProfile()
        //    {
        //        Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //        FirebaseUserId = reader.GetString(reader.GetOrdinal("FirebaseUserId")),
        //        DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
        //        FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
        //        LastName = reader.GetString(reader.GetOrdinal("LastName")),
        //        Email = reader.GetString(reader.GetOrdinal("Email")),
        //        CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
        //        ProfileImageLocation = DbUtils.GetNullableString(reader, "ProfileImageLocation"),
        //        UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
        //        UserType = new UserType()
        //        {
        //            Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
        //            Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
        //        },
        //        //BusinessId = reader.GetInt32(reader.GetOrdinal("BusinessId")),
        //        business = new Business()
        //        {
        //            Id = DbUtils.GetInt(reader, "Id"),
        //            EstablishmentName = DbUtils.GetString(reader, "EstablishmentName"),
        //            Bio = DbUtils.GetString(reader, "Bio"),
        //            Address = DbUtils.GetString(reader, "Address"),
        //            HoursOfOperation = DbUtils.GetString(reader, "HoursOfOperation"),
        //            Phone = DbUtils.GetString(reader, "Phone"),
        //            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
        //            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
        //            Category = new Category()
        //            {
        //                Id = DbUtils.GetInt(reader, "CategoryId"),
        //                Name = DbUtils.GetString(reader, "CategoryName")
        //            }
        //        },
        //    };
        //}


        public List<UserProfile> GetAllUsersANDBusinessz()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id AS UserProfileId, up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ProfileImageLocation, up.UserTypeId, 
                               ut.Name AS UserTypeName,
                               b.Id AS BusinessId, b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId AS BusinessUserProfileId, b.CategoryId,
                               c.Id, c.Name AS CategoryName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                               LEFT JOIN Business b on b.UserProfileId = up.Id
                               LEFT JOIN Category c on b.CategoryId = c.Id
                         ";

                    var reader = cmd.ExecuteReader();
                    var userProfiles = new List<UserProfile>();

                    // userProfiles = null;
                    // Business = null;

                    while (reader.Read())
                    {
                        var userProfileId = DbUtils.GetInt(reader, "UserProfileId");

                        var existingUserProfile = userProfiles.FirstOrDefault(up => up.Id == userProfileId);
                        if (existingUserProfile == null)
                        {
                            existingUserProfile = new UserProfile()
                            {
                                Id = userProfileId,
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
                                    Name = DbUtils.GetString(reader, "UserTypeName")
                                },
                                Businessz = new List<Business>()

                            };

                            userProfiles.Add(existingUserProfile);
                        }

                        if (DbUtils.IsNotDbNull(reader, "BusinessId"))
                        {
                            existingUserProfile.Businessz.Add(new Business()
                            {
                                Id = DbUtils.GetInt(reader, "BusinessId"),
                                EstablishmentName = DbUtils.GetString(reader, "EstablishmentName"),
                                Bio = DbUtils.GetString(reader, "Bio"),
                                Address = DbUtils.GetString(reader, "Address"),
                                HoursOfOperation = DbUtils.GetString(reader, "HoursOfOperation"),
                                Phone = DbUtils.GetString(reader, "Phone"),
                                UserProfileId = userProfileId,
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = DbUtils.GetString(reader, "CategoryName")
                                }

                            });
                        }
                    }

                    reader.Close();

                    return userProfiles;
                }
            }
        }


        public UserProfile GetUserORBusinessByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id AS UserProfileId, up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ProfileImageLocation, up.UserTypeId, 
                               ut.Name AS UserTypeName,
                               b.Id AS BusinessId, b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId AS BusinessUserProfileId, b.CategoryId,
                               c.Id, c.Name AS CategoryName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                               LEFT JOIN Business b on b.UserProfileId = up.Id
                               LEFT JOIN Category c on b.CategoryId = c.Id
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    UserProfile userProfile = null;


                    while (reader.Read())
                    {
                        var userProfileId = DbUtils.GetInt(reader, "UserProfileId");


                        if (userProfile == null)
                        {
                            userProfile = new UserProfile()
                            {
                                Id = userProfileId,
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
                                    Name = DbUtils.GetString(reader, "UserTypeName")
                                },
                                Businessz = new List<Business>()
                            };

                            if (DbUtils.IsNotDbNull(reader, "BusinessId"))
                            {
                                userProfile.Businessz.Add(new Business()
                                {
                                    Id = DbUtils.GetInt(reader, "BusinessId"),
                                    EstablishmentName = DbUtils.GetString(reader, "EstablishmentName"),
                                    Bio = DbUtils.GetString(reader, "Bio"),
                                    Address = DbUtils.GetString(reader, "Address"),
                                    HoursOfOperation = DbUtils.GetString(reader, "HoursOfOperation"),
                                    Phone = DbUtils.GetString(reader, "Phone"),
                                    UserProfileId = userProfileId,
                                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                    Category = new Category()
                                    {
                                        Id = DbUtils.GetInt(reader, "CategoryId"),
                                        Name = DbUtils.GetString(reader, "CategoryName")
                                    }

                                });
                            }
                        }
                    }

                    reader.Close();

                    return userProfile;
                }
            }
        }

        //            UserProfile userProfile = null;

        //            var reader = cmd.ExecuteReader();
        //            if (reader.Read())
        //            {
        //                userProfile = new UserProfile()
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
        //                        Name = DbUtils.GetString(reader, "UserTypeName")
        //                    },
        //                    Business = new Business()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "Id"),
        //                        EstablishmentName = DbUtils.GetString(reader, "EstablishmentName"),
        //                        Bio = DbUtils.GetString(reader, "Bio"),
        //                        Address = DbUtils.GetString(reader, "Address"),
        //                        HoursOfOperation = DbUtils.GetString(reader, "HoursOfOperation"),
        //                        Phone = DbUtils.GetString(reader, "Phone"),
        //                        UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
        //                        CategoryId = DbUtils.GetInt(reader, "CategoryId"),
        //                        Category = new Category()
        //                        {
        //                            Id = DbUtils.GetInt(reader, "CategoryId"),
        //                            Name = DbUtils.GetString(reader, "CategoryName")
        //                        }
        //                    },
        //                };
        //            }
        //            reader.Close();

        //            return userProfile;
        //        }
        //    }
        //}

        public UserProfile GetBusinessByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id AS UserProfileId, up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ProfileImageLocation, up.UserTypeId, 
                               ut.Name AS UserTypeName,
                               b.Id AS BusinessId, b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId AS BusinessUserProfileId, b.CategoryId,
                               c.Id, c.Name AS CategoryName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                               LEFT JOIN Business b on b.UserProfileId = up.Id
                               LEFT JOIN Category c on b.CategoryId = c.Id
                         WHERE ut.Id= 1 AND FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();

                    UserProfile userProfile = null;


                    while (reader.Read())
                    {
                        var userProfileId = DbUtils.GetInt(reader, "UserProfileId");


                        if (userProfile == null)
                        {
                            userProfile = new UserProfile()
                            {
                                Id = userProfileId,
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
                                    Name = DbUtils.GetString(reader, "UserTypeName")
                                },
                                Businessz = new List<Business>()
                            };

                            if (DbUtils.IsNotDbNull(reader, "BusinessId"))
                            {
                                userProfile.Businessz.Add(new Business()
                                {
                                    Id = DbUtils.GetInt(reader, "BusinessId"),
                                    EstablishmentName = DbUtils.GetString(reader, "EstablishmentName"),
                                    Bio = DbUtils.GetString(reader, "Bio"),
                                    Address = DbUtils.GetString(reader, "Address"),
                                    HoursOfOperation = DbUtils.GetString(reader, "HoursOfOperation"),
                                    Phone = DbUtils.GetString(reader, "Phone"),
                                    UserProfileId = userProfileId,
                                    CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                    Category = new Category()
                                    {
                                        Id = DbUtils.GetInt(reader, "CategoryId"),
                                        Name = DbUtils.GetString(reader, "CategoryName")
                                    }

                                });
                            }
                        }
                    }

                    reader.Close();

                    return userProfile;
                }
            }
        }


        public UserProfile GetUserByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id AS UserProfileId, up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ProfileImageLocation, up.UserTypeId, 
                               ut.Name AS UserTypeName                      
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE ut.Id= 2 AND FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserProfileId"),
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
                                Name = DbUtils.GetString(reader, "UserTypeName")
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public UserProfile GetProfileById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    {
                        cmd.CommandText = @"
                        SELECT up.Id AS UserProfileId, up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                               up.Email, up.CreateDateTime, up.ProfileImageLocation, up.UserTypeId, 
                               ut.Name AS UserTypeName,
                               b.Id AS BusinessId, b.EstablishmentName, b.Bio, b.Address, b.HoursOfOperation, b.Phone, b.UserProfileId AS BusinessUserProfileId, b.CategoryId,
                               c.Id, c.Name AS CategoryName
                          FROM UserProfile up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                               LEFT JOIN Business b on b.UserProfileId = up.Id
                               LEFT JOIN Category c on b.CategoryId = c.Id
                        WHERE UserProfileId = @id";

                        //cmd.Parameters.AddWithValue("@id", id);

                        DbUtils.AddParameter(cmd, "@id", id);

                        var reader = cmd.ExecuteReader();

                        UserProfile userProfile = null;

                        while (reader.Read())
                        {
                            var userProfileId = DbUtils.GetInt(reader, "UserProfileId");


                            if (userProfile == null)
                            {
                                userProfile = new UserProfile()
                                {
                                    Id = userProfileId,
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
                                        Name = DbUtils.GetString(reader, "UserTypeName")
                                    },
                                    Businessz = new List<Business>()
                                };

                                if (DbUtils.IsNotDbNull(reader, "BusinessId"))
                                {
                                    userProfile.Businessz.Add(new Business()
                                    {
                                        Id = DbUtils.GetInt(reader, "BusinessId"),
                                        EstablishmentName = DbUtils.GetString(reader, "EstablishmentName"),
                                        Bio = DbUtils.GetString(reader, "Bio"),
                                        Address = DbUtils.GetString(reader, "Address"),
                                        HoursOfOperation = DbUtils.GetString(reader, "HoursOfOperation"),
                                        Phone = DbUtils.GetString(reader, "Phone"),
                                        UserProfileId = userProfileId,
                                        CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                        Category = new Category()
                                        {
                                            Id = DbUtils.GetInt(reader, "CategoryId"),
                                            Name = DbUtils.GetString(reader, "CategoryName")
                                        }

                                    });
                                }

                            }
                        }
                        reader.Close();

                        return userProfile;
                    }
                }
            }
        }

        //public void AddBusinessProfile(UserProfile userProfile)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, FirstName, LastName, DisplayName, 
        //                                                               Email, CreateDateTime, ProfileImageLocation, UserTypeId)
        //                                      OUTPUT INSERTED.ID
        //                                      VALUES (@FirebaseUserId, @FirstName, @LastName, @DisplayName, 
        //                                              @Email, @CreateDateTime, @ProfileImageLocation, @UserTypeId)";
        //            DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
        //            DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
        //            DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
        //            DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
        //            DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
        //            DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
        //            DbUtils.AddParameter(cmd, "@ProfileImageLocation", userProfile.ProfileImageLocation);
        //            DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);


        //            userProfile.Id = (int)cmd.ExecuteScalar();
        //        }

                
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                      INSERT INTO Business(
        //                              EstablishmentName, Bio, Address, HoursOfOperation, Phone, UserProfileId, CategoryId)
        //                      OUTPUT INSERTED.ID
        //                      VALUES (
        //                               @EstablishmentName, @Bio, @Address, @HoursOfOperation, @Phone, @UserProfileId, @CategoryId)";


        //            DbUtils.AddParameter(cmd, "@EstablishmentName", userProfile.Business.EstablishmentName);
        //            DbUtils.AddParameter(cmd, "@Bio", userProfile.Business.Bio);
        //            DbUtils.AddParameter(cmd, "@Address", userProfile.Business.Address);
        //            DbUtils.AddParameter(cmd, "@HoursOfOperation", userProfile.Business.HoursOfOperation);
        //            DbUtils.AddParameter(cmd, "@Phone", userProfile.Business.Phone);
        //            //DbUtils.AddParameter(cmd, "@UserProfileId", business.UserProfileId);
        //            DbUtils.AddParameter(cmd, "@CategoryId", userProfile.Business.CategoryId);

        //            userProfile.Business.Id = (int)cmd.ExecuteScalar();
        //        }

        //    }

        //}




        public void AddUserProfile(UserProfile userProfile)
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
    }
}



