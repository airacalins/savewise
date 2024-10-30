using Application.Dtos;

namespace Application.Interfaces
{
    public interface IGetCollectionByIdCommand
    {
        Task<Result<CollectionDto>> ExecuteCommand(Guid id);
    }
}