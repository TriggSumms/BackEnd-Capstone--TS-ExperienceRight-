using ExperienceRight_BackCapTS.Models;
using System.Collections.Generic;

namespace ExperienceRight_BackCapTS.Repositories
{
    public interface IFrequencyRepository
    {
        void AddFrequency(Frequency frequency);
        void DeleteFrequency(int id);
        void EditFrequency(Frequency frequency);
        List<Frequency> GetAllFrequencies();
        Frequency GetFrequencyById(int id);
    }
}