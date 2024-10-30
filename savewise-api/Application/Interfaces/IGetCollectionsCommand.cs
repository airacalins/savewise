using Application.Dtos;

namespace Application.Interfaces
{
    public interface IGetCollectionsCommand
    {
        Task<Result<List<CollectionDto>>> ExecuteCommand();
    };
}