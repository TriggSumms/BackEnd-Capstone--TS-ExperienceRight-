using ExperienceRight_BackCapTS.Models;
using System.Collections.Generic;

namespace ExperienceRight_BackCapTS.Repositories
{
    public interface IUserTypeRepository
    {
        List<UserType> GetAllUserTypes();
    }
}