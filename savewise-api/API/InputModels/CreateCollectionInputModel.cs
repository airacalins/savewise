using Application.Collections.Dtos;
using Domain.Enums;

namespace API.InputModels
{
    public class CreateCollectionInputModel
    {
        public string Name { get; set; } = string.Empty;

        public CollectionType CollectionType { get; set; }

        public CreateCollectionDto ToCreateCollectionDto()
        {
            return new CreateCollectionDto
            {
                Name = Name,
                CollectionType = CollectionType,
            };
        }
    }
}