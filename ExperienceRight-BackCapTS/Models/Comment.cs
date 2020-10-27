using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExperienceRight_BackCapTS.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public int ReviewId { get; set; }
        public int UserProfileId { get; set; }

       // public int BusinessId { get; set; }

        public Review Review { get; set; }
        public UserProfile UserProfile { get; set; }

       // public Business Business { get; set; }

        //Props below

        [StringLength(255)]
        public string Subject { get; set; }
       
        public string Content { get; set; }

        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime CreateDateTime { get; set; }

    }
}
