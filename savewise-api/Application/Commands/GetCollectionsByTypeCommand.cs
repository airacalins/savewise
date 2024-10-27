using Application.Commands.Interfaces;
using Application.Dtos;
using Application.Repositories.Interfaces;
using Domain.Enums;

namespace Application.Commands
{
    public class GetCollectionsByTypeCommand : IGetCollectionsByTypeCommand
    {
        private readonly ICollectionRepository _collectionRepository;

        public GetCollectionsByTypeCommand(ICollectionRepository collectionRepository)
        {
            _collectionRepository = collectionRepository;

        }
        public async Task<Result<List<CollectionDto>>> ExecuteCommand(CollectionType collectionType)
        {
            var result = await _collectionRepository.GetAll();

            if (result.Count == 0)
            {
                return Result<List<CollectionDto>>.Failure("No collections found");
            }

            var data = result.Where(collection => collection.CollectionType == collectionType).Select(item => new CollectionDto(item)).ToList();

            return Result<List<CollectionDto>>.Success(data);
        }
    }
}