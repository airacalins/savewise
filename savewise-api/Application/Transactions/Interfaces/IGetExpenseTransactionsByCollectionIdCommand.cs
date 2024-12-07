using Application.Transactions.Dtos;

namespace Application.Transactions.Interfaces
{
    public interface IGetExpenseTransactionsByCollectionIdCommand
    {
        Task<Result<List<ExpenseTransactionDto>>> ExecuteCommand(Guid collectionId);
    }
}