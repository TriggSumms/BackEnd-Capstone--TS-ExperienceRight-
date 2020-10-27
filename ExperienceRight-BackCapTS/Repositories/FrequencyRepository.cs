using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using ExperienceRight_BackCapTS.Models;
using System.Data.SqlClient;

namespace ExperienceRight_BackCapTS.Repositories
{

    public class FrequencyRepository : BaseRepository, IFrequencyRepository
    {
        public FrequencyRepository(IConfiguration configuration) : base(configuration) { }

        public List<Frequency> GetAllFrequencies()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText =

                        "SELECT Id, Name FROM Frequency ORDER BY Name";

                    var reader = cmd.ExecuteReader();
                    var frequencies = new List<Frequency>();
                    while (reader.Read())
                    {
                        var frequency = (new Frequency()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        });

                        frequencies.Add(frequency);
                    }

                    reader.Close();

                    return frequencies;
                }
            }
        }

        public void AddFrequency(Frequency frequency)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Frequency (Name)
                        OUTPUT INSERTED.ID
                        VALUES ( @name )";

                    cmd.Parameters.AddWithValue("@name", frequency.Name);

                    int id = (int)cmd.ExecuteScalar();
                    frequency.Id = id;
                }
            }
        }

        public Frequency GetFrequencyById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, name
                        FROM Frequency
                        WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        Frequency frequency = new Frequency()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))
                        };

                        reader.Close();
                        return frequency;

                    }
                    reader.Close();
                    return null;
                }
            }
        }

        public void EditFrequency(Frequency frequency)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Frequency
                            SET 
                                Name = @name
                            WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@name", frequency.Name);
                    cmd.Parameters.AddWithValue("@id", frequency.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }




        public void DeleteFrequency(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Review
                            SET FrequencyId = @frequencyId
                            WHERE FrequencyId = @id
                        ";
                    cmd.Parameters.AddWithValue("@categoryId", 1);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
            using (var conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Frequency
                            WHERE Id = @id
                        ";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}