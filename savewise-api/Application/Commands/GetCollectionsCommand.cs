using Application.Dtos;
using Application.Interfaces;
using Application.Repositories.Interfaces;

namespace Application.Commands
{
    public class GetCollectionsCommand : IGetCollectionsCommand
    {
        private readonly ICollectionRepository _collectionRepository;
        public GetCollectionsCommand(ICollectionRepository collectionRepository)
        {
            _collectionRepository = collectionRepository;
        }

        public async Task<Result<List<CollectionDto>>> ExecuteCommand()
        {
            var result = await _collectionRepository.GetAll();

            if (result.Count == 0)
            {
                return Result<List<CollectionDto>>.Failure("No collections found");
            }

            var data = result.Select(item => new CollectionDto(item)).ToList();

            return Result<List<CollectionDto>>.Success(data);
        }
    }
}