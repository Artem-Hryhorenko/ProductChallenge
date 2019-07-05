using AutoMapper;
using Challenge1.DB.Models;

namespace Challenge1.DTO.Mappings
{
    public class ProductMapping : Profile
    {
        public ProductMapping()
        {
            CreateMap<Product, ProductDTO>();
        }
    }
}
