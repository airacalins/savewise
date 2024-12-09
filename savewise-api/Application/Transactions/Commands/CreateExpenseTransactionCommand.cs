using Application.Transactions.Dtos;
using Application.Transactions.Interfaces;
using Domain.Entities;
using Domain.Enums;

namespace Application.Transactions.Commands
{
    public class CreateExpenseTransactionCommand(IDataContext context) : ICreateExpenseTransactionCommand
    {
        private readonly IDataContext _context = context;

        public async Task<Result<bool>> ExecuteCommand(CreateExpenseTransactionDto input)
        {
            if (input.Description == null)
            {
                return Result<bool>.Failure("Description is required");
            }

            if (input.Amount < 0)
            {
                return Result<bool>.Failure("Amount must be greater than 0");
            }

            if (input.FundCollectionId == Guid.Empty)
            {
                return Result<bool>.Failure("Fund collection ID is required");
            }

            var transaction = new Transaction
            {
                Date = input.Date,
                Description = input.Description,
                Amount = input.Amount,
                FundCollectionId = input.FundCollectionId,
                ExpenseCollectionId = input.ExpenseCollectionId,
                TransactionType = TransactionType.Withdrawal,
                CreatedAt = DateTime.Now
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Result<bool>.Success(true);
        }
    }
}