using Application.Dtos;
using Application.Interfaces;
using Application.Repositories.Interfaces;

namespace Application.Commands
{
    public class CreateCollectionCommand : ICreateCollectionCommand
    {
        private readonly ICollectionRepository _collectionRepository;
        public CreateCollectionCommand(ICollectionRepository collectionRepository)
        {
            _collectionRepository = collectionRepository;

        }
        public Task<Result<bool>> ExecuteCommand(CreateCollectionDto input)
        {
            _collectionRepository.Add(input.ToCollection());
            _collectionRepository.SaveChangesAsync();

            return Task.FromResult(Result<bool>.Success(true));
        }
    }
}