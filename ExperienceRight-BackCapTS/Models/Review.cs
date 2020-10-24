using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExperienceRight_BackCapTS.Models
{
    public class Review
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        //[Required]
        //[MaxLength(255)]
        //[DisplayName("Header Image URL")]
        //public string ImageLocation { get; set; }


        public DateTime CreateDateTime { get; set; }

        [DisplayName("Date of the Experience")]
        [DataType(DataType.Date)]
        public DateTime? DateOfExperience { get; set; }

        [Required]
        public int Rating { get; set; }

        [Required]
        [DisplayName("Frequency of Visit")]
        public int FrequencyId { get; set; }
        public Frequency Frequency { get; set; }

        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }

        [Required]
        public int BusinessId { get; set; }
        public Business Business { get; set; }
    }
}
