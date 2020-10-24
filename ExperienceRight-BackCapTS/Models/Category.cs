using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExperienceRight_BackCapTS.Models
{
    public class Category
    {
        public int Id { get; set; }

        [StringLength(40, MinimumLength = 1)]

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}