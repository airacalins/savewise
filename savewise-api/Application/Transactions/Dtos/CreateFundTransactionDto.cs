namespace Application.Transactions.Dtos
{
    public class CreateFundTransactionDto
    {
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public Guid FundCollectionId { get; set; }
    }
}