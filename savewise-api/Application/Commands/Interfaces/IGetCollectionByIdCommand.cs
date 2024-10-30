using Application.Dtos;

namespace Application.Commands.Interfaces
{
    public interface IGetCollectionByIdCommand
    {
        Task<Result<CollectionDto>> ExecuteCommand(Guid id);
    }
}