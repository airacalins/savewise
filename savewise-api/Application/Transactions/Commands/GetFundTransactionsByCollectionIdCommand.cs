using Application.Transactions.Dtos;
using Application.Transactions.Interfaces;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.Transactions.Commands
{
    public class GetFundTransactionsByCollectionIdCommand(IDataContext context) : IGetFundTransactionsByCollectionIdCommand
    {
        private readonly IDataContext _context = context;

        public async Task<Result<List<FundTransactionDto>>> ExecuteCommand(Guid collectionId)
        {
            var fundTransactions = await _context.Transactions
                .Where(transaction => transaction.FundCollectionId == collectionId && transaction.TransactionType == TransactionType.Deposit)
                .ToListAsync();

            var fundTransactionDtos = fundTransactions.Select(item => new FundTransactionDto
            {
                Id = item.Id,
                Date = item.Date,
                Description = item.Description,
                Amount = item.Amount,
                FundCollectionId = item.FundCollectionId,
            }).ToList();

            return Result<List<FundTransactionDto>>.Success(fundTransactionDtos);
        }
    }
}
