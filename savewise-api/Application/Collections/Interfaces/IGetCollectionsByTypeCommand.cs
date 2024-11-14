using Application.Collections.Dtos;
using Domain.Enums;

namespace Application.Collections.Interfaces
{
    public interface IGetCollectionsByTypeCommand
    {
        Task<Result<List<CollectionDto>>> ExecuteCommand(CollectionType collectionType);
    }
}