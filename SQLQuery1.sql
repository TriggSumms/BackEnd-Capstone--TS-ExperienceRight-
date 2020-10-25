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
                        
                        ORDER BY DateofExperience DESC


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
                              AND r.id = 1


             SELECT Id, ReviewId, UserProfileId, Subject, Content, CreateDateTime
                        FROM Comment
                        ORDER BY CreateDateTime DESC




                        SELECT c.Id, c.ReviewId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime,
                               up.Email, up.DisplayName, up.FirstName, up.LastName, up.ProfileImageLocation,
                               up.CreateDateTime AS UserProfileCreationDate, up.FirebaseUserId, up.UserTypeId,
                               ut.Name AS UserTypeName
                        FROM Comment c
                        LEFT JOIN UserProfile up on c.UserProfileId = up.Id
                        LEFT JOIN UserType ut ON up.UserTypeId = ut.id
                        WHERE c.Id = @id
                        ORDER BY c.CreateDateTime DESC