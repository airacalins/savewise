using Application.Dtos;

namespace Application.Interfaces
{
    public interface ICreateCollectionCommand
    {
        Task<Result<bool>> ExecuteCommand(CreateCollectionDto input);
    }
}