using Application.Collections.Dtos;
using Domain.Entities;

namespace Application.Collections.Interfaces
{
    public interface IUpdateCollectionCommand
    {
        Task<Result<Collection>> ExecuteCommand(Guid id, UpdateCollectionDto input);
    }
}