using AutoMapper;
using Challenge1.DB;
using Challenge1.DB.Models;
using Challenge1.DTO;
using Challenge1.DTO.Validation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge1.Services
{
    class ProductService : IProductService
    {
        private readonly IMapper _mapper;
        private readonly ProductContext _context;

        public ProductService(IMapper mapper, ProductContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<List<ProductDTO>> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();
            return _mapper.Map<List<Product>, List<ProductDTO>>(products);
        }

        public async Task<ProductDTO> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            return _mapper.Map<ProductDTO>(product);
        }

        public async Task<ProductDTO> SaveProduct(ProductDTO product)
        {
            ProductValidation validator = new ProductValidation();
            ValidationResult results = validator.Validate(product);
            if (!results.IsValid)
            {
                throw new System.ComponentModel.DataAnnotations.ValidationException("Validation failed");
            }

            var p = await _context.Products.FindAsync(product.ID);
            if (p == null)
            {
                p = new Product();
                _context.Products.Add(p);
            }

            p.Name = product.Name;
            p.Category = product.Category;
            p.Active = product.Active;
            p.Price = product.Price;

            await _context.SaveChangesAsync();
            return _mapper.Map<ProductDTO>(p);
        }
    }
}
