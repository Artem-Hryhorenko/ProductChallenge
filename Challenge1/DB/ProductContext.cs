using Challenge1.DB.Models;
using Microsoft.EntityFrameworkCore;

namespace Challenge1.DB
{
    public class ProductContext : DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> opts) : base(opts) { }

        public DbSet<Product> Products { get; set; }
    }
}
