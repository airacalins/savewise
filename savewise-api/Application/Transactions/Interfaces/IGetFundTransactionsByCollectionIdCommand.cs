using Application.Transactions.Dtos;
using Domain.Enums;

namespace Application.Transactions.Interfaces
{
    public interface IGetFundTransactionsByCollectionIdCommand
    {
        Task<Result<List<TransactionDto>>> ExecuteCommand(Guid collectionId);
    }
}