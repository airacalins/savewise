using Domain.Enums;

namespace Domain.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public Guid FundCollectionId { get; set; }
        public Collection FundCollection { get; set; }
        public Guid? ExpenseCollectionId { get; set; }
        public Collection? ExpenseCollection { get; set; }
        public TransactionType TransactionType { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}