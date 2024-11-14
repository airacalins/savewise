using Domain.Entities;
using Application.Collections.Dtos;

namespace Application.Transactions.Dtos
{
    public class TransactionDto
    {
        public TransactionDto(Transaction transaction)
        {
            Id = transaction.Id;
            Description = transaction.Description;
            Amount = transaction.Amount;
            FundCollectionId = transaction.FundCollectionId;
            FundCollection = new CollectionDto(transaction.FundCollection);
            ExpenseCollectiondId = transaction.ExpenseCollectiondId;
            ExpenseCollectionId = new CollectionDto(transaction.ExpenseCollectionId);
            CreatedAt = transaction.CreatedAt;
        }

        public Guid Id { get; set; }
        public required string Description { get; set; }
        public double Amount { get; set; }
        public Guid FundCollectionId { get; set; }
        public required CollectionDto FundCollection { get; set; }
        public Guid ExpenseCollectiondId { get; set; }
        public required CollectionDto ExpenseCollectionId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}