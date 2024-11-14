using Application.Collections.Dtos;

namespace Application.Collections.Interfaces
{
    public interface IGetCollectionByIdCommand
    {
        Task<Result<CollectionDto>> ExecuteCommand(Guid id);
    }
}