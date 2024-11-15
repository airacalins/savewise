using Application.Transactions.Dtos;
using Application.Transactions.Interfaces;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.Transactions.Commands
{
    public class GetFundTransactionsByCollectionIdCommand(IDataContext context) : IGetFundTransactionsByCollectionIdCommand
    {
        private readonly IDataContext _context = context;

        public async Task<Result<List<TransactionDto>>> ExecuteCommand(Guid collectionId)
        {
            var transactions = await _context.Transactions
                .Where(transaction => transaction.FundCollectionId == collectionId && transaction.TransactionType == TransactionType.Deposit)
                .ToListAsync();

            if (transactions.Count == 0)
            {
                return Result<List<TransactionDto>>.Failure("No fund transactions found");
            }

            var transactionDtos = transactions.Select(item => new TransactionDto(item)).ToList();

            return Result<List<TransactionDto>>.Success(transactionDtos);
        }
    }
}
