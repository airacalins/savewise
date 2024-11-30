using Application.Transactions.Dtos;
using Application.Transactions.Interfaces;

namespace Application.Transactions.Commands
{
    public class GetTransactionByIdCommand(IDataContext context) : IGetTransactionByIdCommand
    {
        private readonly IDataContext _context = context;

        public async Task<Result<TransactionDto>> ExecuteCommand(Guid id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return Result<TransactionDto>.Failure("Transaction not found");
            }

            return Result<TransactionDto>.Success(new TransactionDto
            {
                Id = transaction.Id,
                Date = transaction.Date,
                Description = transaction.Description,
                Amount = transaction.Amount,
                FundCollectionId = transaction.FundCollectionId,
                ExpenseCollectionId = transaction.ExpenseCollectionId,
                TransactionType = transaction.TransactionType,
            });

        }
    }
}