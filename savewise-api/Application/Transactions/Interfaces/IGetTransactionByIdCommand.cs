using Application.Transactions.Dtos;

namespace Application.Transactions.Interfaces
{
    public interface IGetTransactionByIdCommand
    {
        Task<Result<TransactionDto>> ExecuteCommand(Guid id);
    }
}