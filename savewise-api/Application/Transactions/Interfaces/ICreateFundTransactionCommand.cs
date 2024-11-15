using Application.Transactions.Dtos;

namespace Application.Transactions.Interfaces
{
    public interface ICreateFundTransactionCommand
    {
        Task<Result<TransactionDto>> ExecuteCommand(CreateFundTransactionDto input);
    }
}