//using System;
//using System.Collections.Generic;
//using System.ComponentModel;
//using System.ComponentModel.DataAnnotations;
//using System.Linq;
//using System.Threading.Tasks;

//namespace Tabloid.Models
//{
//    public class Post
//    {
//        public int Id { get; set; }

//        [Required]
//        [MaxLength(255)]
//        public string Title { get; set; }

//        [Required]
//        public string Content { get; set; }

//        [Required]
//        [MaxLength(255)]
//        [DisplayName("Header Image URL")]
//        public string ImageLocation { get; set; }


//        public DateTime CreateDateTime { get; set; }

//        [DisplayName("Published")]
//        [DataType(DataType.Date)]
//        public DateTime? PublishDateTime { get; set; }

//        public bool IsApproved { get; set; }

//        [Required]
//        [DisplayName("Category")]
//        public int CategoryId { get; set; }
//        public Category Category { get; set; }

//        [Required]
//        public int UserProfileId { get; set; }
//        public UserProfile UserProfile { get; set; }
//    }
//}
