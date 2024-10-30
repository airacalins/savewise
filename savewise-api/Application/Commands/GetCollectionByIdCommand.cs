using Application.Commands.Interfaces;
using Application.Dtos;
using Application.Repositories;
using Application.Repositories.Interfaces;

namespace Application.Commands
{
    public class GetCollectionByIdCommand : IGetCollectionByIdCommand
    {
        private readonly ICollectionRepository _collectionRepository;
        public GetCollectionByIdCommand(ICollectionRepository collectionRepository)
        {
            _collectionRepository = collectionRepository;
        }

        public async Task<Result<CollectionDto>> ExecuteCommand(Guid id)
        {
            var result = await _collectionRepository.GetById(id);

            if (result == null)
            {
                return Result<CollectionDto>.Failure("Collection not found");
            }

            return Result<CollectionDto>.Success(new CollectionDto(result));
        }
    }
}