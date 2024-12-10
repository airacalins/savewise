using Application.Transactions.Commands;

namespace Application.Transactions.Interfaces
{
    public interface ICreateTransactionCommand
    {
        Task<Result<bool>> ExecuteCommand(CreateTransactionDto input);
    }
}