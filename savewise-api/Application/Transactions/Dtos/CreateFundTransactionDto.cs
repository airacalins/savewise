using Domain.Entities;
using Domain.Enums;

namespace Application.Transactions.Dtos
{
    public class CreateFundTransactionDto
    {
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public double Amount { get; set; }
        public Guid FundCollectionId { get; set; }

        public Transaction ToTransactionEntity()
        {
            return new Transaction
            {
                Date = Date,
                Description = Description,
                Amount = Amount,
                FundCollectionId = FundCollectionId,
                TransactionType = TransactionType.Deposit,
                CreatedAt = DateTime.Now,

            };
        }
    }
}