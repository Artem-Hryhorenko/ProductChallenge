using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Challenge1.DB;
using Challenge1.DB.Models;
using Challenge1.DTO;
using Challenge1.Services;
using System.ComponentModel.DataAnnotations;

namespace Challenge1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts()
        {
            return await _productService.GetAllProducts();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            var product = await _productService.GetProduct(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products
        [HttpPut]
        public async Task<IActionResult> PutProduct(ProductDTO product)
        {
            try
            {
                await _productService.SaveProduct(product);
                return NoContent();
            }
            catch (ValidationException)
            {
                return BadRequest();
            }
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<ProductDTO>> PostProduct(ProductDTO product)
        {
            try
            {
                var newProduct = await _productService.SaveProduct(product);
                return CreatedAtAction(nameof(GetProduct), new { id = newProduct.ID }, newProduct);
            }
            catch (ValidationException)
            {
                return BadRequest();
            }
        }
    }
}
