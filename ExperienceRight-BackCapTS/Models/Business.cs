using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace ExperienceRight_BackCapTS.Models
{
    public class Business
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(75)]
        public string EstablishmentName { get; set; }

        [Required]
        public string Bio { get; set; }

        //[Required]
        //[MaxLength(255)]
        //[DisplayName("Header Image URL")]
        //public string ImageLocation { get; set; }
        [Required]
        [MaxLength(200)]
        public string Address { get; set; }

        [Required]
        [MaxLength(255)]
        public string HoursOfOperation { get; set; }

        [Required]
        [MaxLength(30)]
        public string Phone { get; set; }

        [Required]
        [DisplayName("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Required]
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
