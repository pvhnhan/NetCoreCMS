using System.ComponentModel.DataAnnotations;

namespace CMS.Core.Entities
{
    public class CategoryType : BaseEntity
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [StringLength(200)]
        public string Description { get; set; } = string.Empty;
    }
} 