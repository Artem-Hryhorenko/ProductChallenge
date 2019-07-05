using Challenge1.DB.Models;
using System.Linq;

namespace Challenge1.DB
{
    public class DBInitializer
    {
        public static void Initialize(ProductContext context)
        {
            context.Database.EnsureCreated();

            if (context.Products.Any())
            {
                return;
            }

            context.Products.Add(new Product
            {
                Name = "Product1",
                Category = "Category",
                Active = true,
                Price = 50.56M
            });

            context.Products.Add(new Product
            {
                Name = "Product2",
                Category = "Category",
                Active = true,
                Price = 319.00M
            });

            context.SaveChanges();
        }
    }
}
