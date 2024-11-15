using Application.Transactions.Dtos;
using Application.Transactions.Interfaces;

namespace Application.Transactions.Commands
{
    public class CreateFundTransactionCommand(IDataContext context) : ICreateFundTransactionCommand
    {
        private readonly IDataContext _context = context;

        public Task<Result<TransactionDto>> ExecuteCommand(CreateFundTransactionDto input)
        {
            var transaction = input.ToTransactionEntity();
            _context.Transactions.Add(transaction);
            _context.SaveChangesAsync();

            return Task.FromResult(Result<TransactionDto>.Success(new TransactionDto(transaction)));
        }
    }
}