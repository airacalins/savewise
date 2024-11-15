using Application.Transactions.Dtos;

namespace Application.Transactions.Interfaces
{
    public interface IGetFundTransactionsByCollectionIdCommand
    {
        Task<Result<List<TransactionDto>>> ExecuteCommand(Guid collectionId);
    }
}