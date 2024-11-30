using Application.Transactions.Dtos;

namespace Application.Transactions.Interfaces
{
    public interface ICreateFundTransactionCommand
    {
        Task<Result<bool>> ExecuteCommand(CreateTransactionDto input);
    }
}