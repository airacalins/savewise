using Application.Collections.Dtos;

namespace Application.Collections.Interfaces
{
    public interface IGetCollectionsCommand
    {
        Task<Result<List<CollectionDto>>> ExecuteCommand();
    };
}