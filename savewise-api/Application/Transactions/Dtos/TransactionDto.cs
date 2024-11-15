using Domain.Entities;
using Domain.Enums;

namespace Application.Transactions.Dtos
{
    public class TransactionDto
    {
        public TransactionDto(Transaction transaction)
        {
            Id = transaction.Id;
            Date = transaction.Date;
            Description = transaction.Description;
            Amount = transaction.Amount;
            FundCollectionId = transaction.FundCollectionId;
            FundCollection = transaction.FundCollection;
            TransactionType = transaction.TransactionType;
        }

        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public Guid FundCollectionId { get; set; }
        public Collection FundCollection { get; set; }
        public TransactionType TransactionType { get; set; }
    }
}