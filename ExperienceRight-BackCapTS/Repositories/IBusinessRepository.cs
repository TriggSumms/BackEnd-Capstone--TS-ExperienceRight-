using ExperienceRight_BackCapTS.Models;
using System.Collections.Generic;

namespace ExperienceRight_BackCapTS.Repositories
{
    public interface IBusinessRepository
    {
        //void AddBusiness(Business business, int userProfileId);
        void AddBusiness(Business business);
        void DeleteBusiness(int id);

        void UpdateBusiness(Business business);
        List<Business> GetAllBusinessz();
        Business GetBusinessById(int id);
        //Business GetUserBusinessById(int id, int userProfileId);

        List<Business> GetAllBusinessesByCategory(int id);

        Business GetUserBusinessById(int id, int userProfileId);

        List<Business> SearchBusinessesByCategory(string criterion);
    }
}