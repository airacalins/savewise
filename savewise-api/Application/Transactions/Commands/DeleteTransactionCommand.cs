using Application.Transactions.Interfaces;

namespace Application.Transactions.Commands
{
    public class DeleteTransactionCommand(IDataContext context) : IDeleteTransactionCommand
    {
        private readonly IDataContext _context = context;

        public async Task<Result<bool>> ExecuteCommand(Guid id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return Result<bool>.Failure("Transaction not found");
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return Result<bool>.Success(true);
        }
    }
}