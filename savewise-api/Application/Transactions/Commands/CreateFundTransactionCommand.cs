using Application.Transactions.Dtos;
using Application.Transactions.Interfaces;
using Domain.Entities;
using Domain.Enums;

namespace Application.Transactions.Commands
{
    public class CreateFundTransactionCommand(IDataContext context) : ICreateFundTransactionCommand
    {
        private readonly IDataContext _context = context;

        public async Task<Result<bool>> ExecuteCommand(CreateTransactionDto input)
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
                Amount = input.Amount,
                Description = input.Description,
                FundCollectionId = input.FundCollectionId,
                TransactionType = TransactionType.Deposit,
                CreatedAt = DateTime.Now
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Result<bool>.Success(true);
        }
    }
}