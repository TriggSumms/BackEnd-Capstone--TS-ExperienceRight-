using ExperienceRight_BackCapTS.Models;
using System.Collections.Generic;

namespace ExperienceRight_BackCapTS.Repositories
{
    public interface IUserProfileRepository
    {
        //void AddBusinessProfile(UserProfile userProfile, int id);
        void AddUserProfile(UserProfile userProfile);
        List<UserProfile> GetAllUsersANDBusinessz();
        UserProfile GetBusinessByFirebaseUserId(string firebaseUserId);
        UserProfile GetProfileById(int id);
        UserProfile GetUserByFirebaseUserId(string firebaseUserId);
        UserProfile GetUserORBusinessByFirebaseUserId(string firebaseUserId);
    }
}