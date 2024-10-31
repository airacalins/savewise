using Domain.Entities;
using Domain.Enums;

namespace Application.Dtos
{
    public class CreateCollectionDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public CollectionType CollectionType { get; set; }

        public Collection ToCollection()
        {
            return new Collection
            {
                Name = Name,
                CollectionType = CollectionType,
                CreatedAt = DateTime.Now,

            };
        }
    }
}