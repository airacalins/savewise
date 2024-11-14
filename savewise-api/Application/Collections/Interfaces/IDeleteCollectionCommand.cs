using Application.Collections.Dtos;

namespace Application.Collections.Interfaces
{
    public interface IDeleteCollectionCommand
    {
        Task<Result<bool>> ExecuteCommand(Guid id);
    }
}