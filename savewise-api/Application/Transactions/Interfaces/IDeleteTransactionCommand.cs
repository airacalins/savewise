namespace Application.Transactions.Interfaces
{
    public interface IDeleteTransactionCommand
    {
        Task<Result<bool>> ExecuteCommand(Guid id);
    }
}