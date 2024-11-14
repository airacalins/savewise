using Application.Collections.Dtos;
using Domain.Entities;

namespace Application.Collections.Interfaces
{
    public interface ICreateCollectionCommand
    {
        Task<Result<Collection>> ExecuteCommand(CreateCollectionDto input);
    }
}