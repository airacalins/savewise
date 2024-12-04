using Application.Transactions.Dtos;

namespace Application.Transactions.Interfaces
{
    public interface IUpdateTransactionCommand
    {
        Task<Result<bool>> ExecuteCommand(Guid id, UpdateTransactionDto input);
    }
}