using Application.Collections.Dtos;

namespace API.InputModels
{
    public class UpdateCollectionInputModel
    {
        public string Name { get; set; } = string.Empty;

        public UpdateCollectionDto TUpdateCollectionDto()
        {
            return new UpdateCollectionDto
            {
                Name = Name,
            };
        }
    }
}