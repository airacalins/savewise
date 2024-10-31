using System.Text.Json.Serialization;
using Domain.Entities;
using Domain.Enums;

namespace Application.Dtos
{
    public class CreateCollectionDto
    {
        public string Name { get; set; } = string.Empty;

        public CollectionType CollectionType { get; set; }

        public Collection ToCollection()
        {
            return new Collection
            {
                Id = new Guid(),
                Name = Name,
                CollectionType = CollectionType,
                CreatedAt = DateTime.Now,

            };
        }
    }
}