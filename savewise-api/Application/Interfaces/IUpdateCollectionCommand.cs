using Application.Dtos;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUpdateCollectionCommand
    {
        Task<Result<Collection>> ExecuteCommand(Guid id, UpdateCollectionDto input);
    }
}