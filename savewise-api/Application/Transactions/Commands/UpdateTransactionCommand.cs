using System.Transactions;
using Application.Transactions.Dtos;
using Application.Transactions.Interfaces;

namespace Application.Transactions.Commands
{
    public class UpdateTransactionCommand(IDataContext context) : IUpdateTransactionCommand
    {
        private readonly IDataContext _context = context;

        public async Task<Result<bool>> ExecuteCommand(Guid id, UpdateTransactionDto input)
        {
            if (input.Amount < 0)
            {
                return Result<bool>.Failure("Amount must be greater than 0");
            }
            if (input.Description == null)
            {
                return Result<bool>.Failure("Description is required");
            }
            if (input.FundCollectionId == Guid.Empty)
            {
                return Result<bool>.Failure("Fund collection ID is required");
            }

            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return Result<bool>.Failure("Transaction not found");
            }

            transaction.Date = input.Date;
            transaction.Amount = input.Amount;
            transaction.Description = input.Description;
            transaction.FundCollectionId = input.FundCollectionId;

            await _context.SaveChangesAsync();

            return Result<bool>.Success(true);
        }


    }
}