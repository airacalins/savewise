using Application.Transactions.Dtos;
using Application.Transactions.Interfaces;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Application.Transactions.Commands
{
    public class GetExpenseTransactionsByCollectionIdCommand(IDataContext context) : IGetExpenseTransactionsByCollectionIdCommand
    {

        private readonly IDataContext _context = context;

        public async Task<Result<List<ExpenseTransactionDto>>> ExecuteCommand(Guid collectionId)
        {
            var expenseTransactions = await _context.Transactions
                .Where(transaction => transaction.ExpenseCollectionId == collectionId && transaction.TransactionType == TransactionType.Withdrawal)
                .ToListAsync();

            var expenseTransactionDtos = expenseTransactions.Select(item => new ExpenseTransactionDto
            {
                Id = item.Id,
                Date = item.Date,
                Description = item.Description,
                Amount = item.Amount,
                FundCollectionId = item.FundCollectionId,
                ExpenseCollectionId = item.ExpenseCollectionId
            }).ToList();

            return Result<List<ExpenseTransactionDto>>.Success(expenseTransactionDtos);
        }
    }
}