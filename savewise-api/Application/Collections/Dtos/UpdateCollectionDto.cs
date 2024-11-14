using Domain.Entities;

namespace Application.Collections.Dtos
{
    public class UpdateCollectionDto
    {
        public string Name { get; set; } = string.Empty;

        public Collection ToCollection()
        {
            return new Collection
            {
                Name = Name,
            };
        }
    }
}