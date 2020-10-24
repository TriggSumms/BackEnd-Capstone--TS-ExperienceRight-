﻿using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using ExperienceRight_BackCapTS.Models;

namespace ExperienceRight_BackCapTS.Repositories
{
    public class UserTypeRepository : BaseRepository, IUserTypeRepository
    {
        public UserTypeRepository(IConfiguration config) : base(config) { }

        public List<UserType> GetAllUserTypes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, Name
                            FROM UserType
                        ";
                    var reader = cmd.ExecuteReader();
                    var userType = new List<UserType>();

                    while (reader.Read())
                    {
                        userType.Add(new UserType()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });
                    }

                    reader.Close();

                    return userType; 
                }
            }
        }

    }
}


