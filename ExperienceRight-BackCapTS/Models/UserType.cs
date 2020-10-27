using System.ComponentModel.DataAnnotations;

namespace ExperienceRight_BackCapTS.Models
{
    public class UserType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        //public static int Business_ID => 1;
        //public static int Anonymous_ID => 2;
    }
}