using FluentValidation;

namespace Challenge1.DTO.Validation
{
    public class ProductValidation : AbstractValidator<ProductDTO>
    {
        public ProductValidation()
        {
            RuleFor(p => p.Name)
                .NotEmpty();

            RuleFor(p => p.Category)
                .NotEmpty();

            RuleFor(p => p.Active)
                .NotNull();

            RuleFor(p => p.Price)
                .GreaterThanOrEqualTo(0M);
        }
    }
}
