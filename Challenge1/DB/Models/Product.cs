using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Challenge1.DB.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Category { get; set; }

        public bool Active { get; set; }

        [Required]
        [Range(0, 99999.99)]
        [Column(TypeName = "decimal(7, 2)")]
        public decimal Price { get; set; }
    }
}
