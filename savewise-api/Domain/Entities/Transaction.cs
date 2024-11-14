namespace Domain.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public required string Description { get; set; }
        public double Amount { get; set; }
        public Guid FundCollectionId { get; set; }
        public required Collection FundCollection { get; set; }
        public Guid ExpenseCollectiondId { get; set; }
        public required Collection ExpenseCollectionId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}