using Application.Dtos;

namespace Application.Interfaces
{
    public interface IDeleteCollectionCommand
    {
        Task<Result<bool>> ExecuteCommand(Guid id);
    }
}