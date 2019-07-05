using Challenge1.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Challenge1.Services
{
    public interface IProductService
    {
        Task<List<ProductDTO>> GetAllProducts();

        Task<ProductDTO> GetProduct(int id);

        Task<ProductDTO> SaveProduct(ProductDTO product);
    }
}
