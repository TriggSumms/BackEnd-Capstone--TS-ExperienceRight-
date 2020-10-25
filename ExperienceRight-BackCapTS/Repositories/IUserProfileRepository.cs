using ExperienceRight_BackCapTS.Models;
using System.Collections.Generic;

namespace ExperienceRight_BackCapTS.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        //List<UserProfile> GetAllActive();
        //List<UserProfile> GetAllInactive();
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserProfileById(int id);
        void UpdateUserProfile(UserProfile userProfile);


    }
}