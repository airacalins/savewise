using Application.Transactions.Dtos;

namespace Application.Transactions.Interfaces
{
    public interface ICreateExpenseTransactionCommand
    {
        Task<Result<bool>> ExecuteCommand(CreateExpenseTransactionDto input);
    }
}