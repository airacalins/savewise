using Application.Dtos;

namespace Application.Commands.Interfaces
{
    public interface IGetCollectionsCommand
    {
        Task<Result<List<CollectionDto>>> ExecuteCommand();
    };
}