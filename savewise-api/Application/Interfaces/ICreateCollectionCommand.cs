using Application.Dtos;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface ICreateCollectionCommand
    {
        Task<Result<Collection>> ExecuteCommand(CreateCollectionDto input);
    }
}