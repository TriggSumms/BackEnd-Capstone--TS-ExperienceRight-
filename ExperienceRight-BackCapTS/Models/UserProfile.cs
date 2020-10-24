using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using Tabloid.Models;

namespace ExperienceRight_BackCapTS.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(50)]
        public string DisplayName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }

        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime CreateDateTime { get; set; }

        [DataType(DataType.Url)]
        [MaxLength(255)]
        public string ProfileImageLocation { get; set; }

        [Required]
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }

        //public bool IsActive { get; set; }
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

        //Had to bringin elements to tie to the get all userprofile SQL call:
        public Business Business { get; set; }


        public Category Category { get; set; }
    }