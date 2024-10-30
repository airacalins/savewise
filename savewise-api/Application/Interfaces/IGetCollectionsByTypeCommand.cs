using Application.Dtos;
using Domain.Enums;

namespace Application.Interfaces
{
    public interface IGetCollectionsByTypeCommand
    {
        Task<Result<List<CollectionDto>>> ExecuteCommand(CollectionType collectionType);
    }
}