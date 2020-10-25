using ExperienceRight_BackCapTS.Models;
using System.Collections.Generic;

namespace ExperienceRight_BackCapTS.Repositories
{
    public interface ICategoryRepository
    {
        void AddCategory(Category category);
        void DeleteCategory(int id);
        void EditCategory(Category category);
        List<Category> GetAllCategories();
        Category GetCategoryById(int id);
    }
}